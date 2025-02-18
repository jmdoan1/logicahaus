import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
export const supabase = createClient(supabaseUrl ?? "", supabaseKey ?? "");

export type OrgTable = {
  table_name: string;
  display_name: string;
};

export type TableRow = {
  id: number;
  fields: Record<string, string | number>;
};

export async function fetchOrgTables(orgId: string): Promise<OrgTable[]> {
  let query = supabase
    .from("org_tables")
    .select("table_name, display_name")
    .eq("org_id", `${orgId}`);

  if (process.env.NODE_ENV === "production") {
    query = query.eq("prod", true);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching tables:", error);
    return [];
  }

  return data as OrgTable[];
}

export async function fetchTableSchema(
  tableName: string
): Promise<{ column_name: string; data_type: string }[]> {
  const { data, error } = await supabase.rpc("fetch_table_schema", {
    name_of_table: tableName,
  });

  if (error) {
    console.error(`Error fetching schema for table ${tableName}:`, error);
    return [];
  }

  return data as { column_name: string; data_type: string }[];
}

export async function fetchTableData(tableName: string): Promise<TableRow[]> {
  const { data, error } = await supabase.from(tableName).select("*");

  if (error) {
    console.error(`Error fetching data from ${tableName}:`, error);
    return [];
  }

  return (data as Record<string, any>[]).map((record) => {
    const { id, ...fields } = record;
    return { id, fields } as TableRow;
  });
}

export async function addRow(
  tableName: string,
  newRow: Record<string, any>
): Promise<void> {
  const { error } = await supabase.from(tableName).insert([newRow]);

  if (error) {
    console.error(`Error adding row to ${tableName}:`, error);
    throw new Error(error.message, error);
  }
}

export async function updateRow(
  tableName: string,
  rowId: number,
  updatedFields: Record<string, any>
): Promise<void> {
  const { error } = await supabase
    .from(tableName)
    .update(updatedFields)
    .eq("id", rowId);

  if (error) {
    console.error(`Error updating row ${rowId} in ${tableName}:`, error);
    throw new Error(error.message, error);
  }
}

export async function deleteRow(
  tableName: string,
  rowId: number
): Promise<void> {
  const { error } = await supabase.from(tableName).delete().eq("id", rowId);

  if (error) {
    console.error(`Error deleting row ${rowId} in ${tableName}:`, error);
    throw new Error(error.message, error);
  }
}
