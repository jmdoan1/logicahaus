/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { MdAdd, MdDelete, MdSave } from "react-icons/md";
import {
  addRow,
  deleteRow,
  fetchOrgTables,
  fetchTableData,
  fetchTableSchema, // Import the new function
  OrgTable,
  TableRow,
  updateRow,
} from "../../../supa";
import {
  DataGrid,
  GridColDef,
  GridRowId,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import { Popover } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers";

type Props = {
  orgId: string;
};

const OrgTables: React.FC<Props> = ({ orgId }) => {
  const [tables, setTables] = useState<OrgTable[]>([]);
  const [tableData, setTableData] = useState<Record<string, TableRow[]>>({});
  const [tableSchemas, setTableSchemas] = useState<
    Record<string, { column_name: string; data_type: string }[]>
  >({});
  const [modifiedRows, setModifiedRows] = useState<Record<string, Set<number>>>(
    {}
  );
  const [newRowValues, setNewRowValues] = useState<
    Record<string, Record<string, any>>
  >({});
  const [anchorEl, setAnchorEl] = useState<HTMLImageElement | null>(null);
  const [popoverId, setPopoverId] = useState<GridRowId>();

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      // Check if there are unsaved changes or new rows
      const hasUnsavedChanges = Object.values(modifiedRows).some(
        (rows) => rows.size > 0
      );

      const hasNewRows = Object.values(newRowValues).some(
        (newRow) => Object.keys(newRow).length > 0
      );

      if (hasUnsavedChanges || hasNewRows) {
        event.preventDefault();
        event.returnValue = ""; // This triggers the browser's default confirmation dialog
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [modifiedRows, newRowValues]);

  useEffect(() => {
    if (orgId !== "") {
      const loadTables = async () => {
        const fetchedTables = await fetchOrgTables(orgId);
        setTables(fetchedTables);

        const data: Record<string, TableRow[]> = {};
        const schemas: Record<string, any[]> = {};

        for (const { table_name } of fetchedTables) {
          data[table_name] = await fetchTableData(table_name);
          schemas[table_name] = await fetchTableSchema(table_name);
        }

        setTableData(data);
        setTableSchemas(schemas);

        const modified: Record<string, Set<number>> = {};
        fetchedTables.forEach(({ table_name }) => {
          modified[table_name] = new Set();
        });
        setModifiedRows(modified);
      };

      loadTables();
    }
  }, [orgId]);

  const handleFieldChange = (
    table: string,
    rowId: number,
    field: string,
    value: any
  ) => {
    setTableData((prev) => ({
      ...prev,
      [table]: prev[table].map((row) =>
        row.id === rowId
          ? { ...row, fields: { ...row.fields, [field]: value } }
          : row
      ),
    }));

    setModifiedRows((prev) => {
      const updatedSet = new Set(prev[table]);
      updatedSet.add(rowId);
      return { ...prev, [table]: updatedSet };
    });
  };

  const handleSave = async (table: string, rowId: number) => {
    const row = tableData[table].find((row) => row.id === rowId);
    if (!row) return;

    try {
      await updateRow(table, rowId, row.fields);

      setModifiedRows((prev) => {
        const updatedSet = new Set(prev[table]);
        updatedSet.delete(rowId);
        return { ...prev, [table]: updatedSet };
      });
    } catch (error: any) {
      console.error(`Failed to save row ${rowId} in ${table}:`, error);

      window.alert(`Failed to save changes: ${error.message || error}`);
    }
  };

  const handleAddRow = async (table: string) => {
    const newRow = newRowValues[table];

    try {
      await addRow(table, newRow);

      const updatedData = await fetchTableData(table);
      setTableData((prev) => ({ ...prev, [table]: updatedData }));

      const fields = Object.keys(newRow);
      setNewRowValues((prev) => ({
        ...prev,
        [table]: fields.reduce((acc, field) => ({ ...acc, [field]: "" }), {}),
      }));
    } catch (error: any) {
      console.error(`Failed to add a new row to ${table}:`, error);
      window.alert(`Failed to add a new row: ${error.message || error}`);
    }
  };

  const handleDeleteRow = async (table: string, rowId: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmed) {
      try {
        await deleteRow(table, rowId);
        setTableData((prev) => ({
          ...prev,
          [table]: prev[table].filter((row) => row.id !== rowId),
        }));
      } catch {
        window.alert(`Failed to delete row ${rowId} in ${table}.`);
      }
    }
  };

  return (
    <section>
      {tables.map(({ table_name, display_name }) => {
        const schema = tableSchemas[table_name] || [];
        const rows = [
          ...((tableData[table_name] || []) as TableRow[]).map(
            ({ id, fields }) => ({
              id,
              ...fields,
            })
          ),

          // Add a special row for adding new data
          {
            id: "NewRow",
            ...newRowValues[table_name],
          },
        ];

        // Generate columns dynamically based on the schema
        const columns: GridColDef[] = schema
          .filter((col) => col.column_name !== "id")
          .map(({ column_name, data_type }) => ({
            field: column_name,
            headerName: column_name,
            flex: 1,
            editable: true, // Allow inline editing
            renderCell: (params) => {
              if (column_name === "image_url") {
                const handlePopoverOpen = (
                  event: React.MouseEvent<HTMLImageElement>
                ) => {
                  setAnchorEl(event.currentTarget);
                  setPopoverId(params.id);
                };

                const handlePopoverClose = () => {
                  setAnchorEl(null);
                  setPopoverId(undefined);
                };

                return (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <input
                      className="bg-transparent"
                      type={data_type === "integer" ? "number" : "text"}
                      value={params.value || ""}
                      onChange={(e) =>
                        handleFieldChange(
                          table_name,
                          Number(params.id),
                          column_name,
                          e.target.value
                        )
                      }
                      style={{ marginRight: 10, flex: 1, border: "none" }}
                    />
                    {params.value && (
                      <div onMouseLeave={handlePopoverClose}>
                        <img
                          src={params.value as string}
                          alt="Preview"
                          style={{
                            width: "50px",
                            height: "auto",
                            cursor: "pointer",
                          }}
                          onMouseEnter={handlePopoverOpen}
                        />
                        <Popover
                          open={popoverId === params.id}
                          anchorEl={anchorEl}
                          onClose={handlePopoverClose}
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                          transformOrigin={{
                            vertical: "center",
                            horizontal: "center",
                          }}
                          slotProps={{
                            paper: {
                              onMouseLeave: handlePopoverClose,
                            },
                          }}
                        >
                          <img
                            src={params.value as string}
                            alt="Large Preview"
                            style={{
                              width: "300px",
                              height: "auto",
                              display: "block",
                            }}
                          />
                        </Popover>
                      </div>
                    )}
                  </div>
                );
              } else if (data_type === "timestamp with time zone") {
                return (
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      value={params.value ? new Date(params.value) : null}
                      onChange={(val) => {
                        if (params.id === "NewRow") {
                          setNewRowValues((prev) => ({
                            ...prev,
                            [table_name]: {
                              ...prev[table_name],
                              [column_name]: val?.toISOString() || "",
                            },
                          }));
                        } else {
                          handleFieldChange(
                            table_name,
                            Number(params.id),
                            column_name,
                            val?.toISOString() || ""
                          );
                        }
                      }}
                    />
                  </LocalizationProvider>
                );
              } else if (data_type === "boolean") {
                // Render a checkbox for boolean fields
                return (
                  <input
                    className="bg-transparent"
                    type="checkbox"
                    checked={params.value || false}
                    onChange={(e) =>
                      handleFieldChange(
                        table_name,
                        Number(params.id),
                        column_name,
                        e.target.checked
                      )
                    }
                  />
                );
              } else {
                // Default input for other types
                return (
                  <input
                    className="bg-transparent"
                    type={data_type === "integer" ? "number" : "text"}
                    value={params.value || ""}
                    onChange={(e) =>
                      handleFieldChange(
                        table_name,
                        Number(params.id),
                        column_name,
                        e.target.value
                      )
                    }
                    style={{ width: "100%", border: "none" }}
                  />
                );
              }
            },
          }));

        // Add custom actions column
        columns.push({
          field: "actions",
          headerName: "Actions",
          type: "actions",
          getActions: ({ id }: { id: GridRowId }) =>
            id === "NewRow"
              ? [
                  <GridActionsCellItem
                    key={id + "-add"}
                    label="Add"
                    onClick={() => handleAddRow(table_name)}
                    icon={<MdAdd />}
                  />,
                ]
              : [
                  <GridActionsCellItem
                    key={id + "-save"}
                    label="Save"
                    onClick={() => handleSave(table_name, Number(id))}
                    icon={<MdSave />}
                    disabled={!modifiedRows[table_name]?.has(Number(id))}
                  />,
                  <GridActionsCellItem
                    key={id + "-delete"}
                    label="Delete"
                    onClick={() => handleDeleteRow(table_name, Number(id))}
                    icon={<MdDelete />}
                  />,
                ],
        });

        return (
          <div key={table_name} style={{ marginTop: 50 }}>
            <h2 className="h2">{display_name}</h2>
            <div style={{ width: "100%" }}>
              <DataGrid
                className="bg-white"
                rows={rows || []}
                columns={columns}
                processRowUpdate={(newRow) => {
                  const { id, ...fields } = newRow;
                  if (id === "NewRow") {
                    setNewRowValues((prev) => ({
                      ...prev,
                      [table_name]: fields,
                    }));
                  } else {
                    for (const [field, value] of Object.entries(fields)) {
                      handleFieldChange(table_name, Number(id), field, value);
                    }
                  }
                  return newRow;
                }}
              />
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default OrgTables;
