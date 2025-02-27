"use client";

import { useState, useEffect } from "react";
import {
  Copy,
  Lock,
  Unlock,
  RefreshCw,
  Download,
  Check,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/_components/ui/tooltip";
import { toast } from "@/app/_hooks/use-toast";
import { Toaster } from "@/app/_components/ui/toaster";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/app/_components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { Label } from "@/app/_components/ui/label";
import PlayGroundCard from "./playground-card";
import { codeLinkBase } from "@/app/global";

interface ColorData {
  id: string;
  hex: string;
  locked: boolean;
  name: string;
}

type ColorScheme =
  | "random"
  | "analogous"
  | "monochromatic"
  | "complementary"
  | "triadic";

export default function ColorPaletteGenerator({
  inline = false,
}: {
  inline?: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(!inline);
  const [colors, setColors] = useState<ColorData[]>([]);
  const [colorScheme, setColorScheme] = useState<ColorScheme>("analogous");
  const [baseHue, setBaseHue] = useState(Math.floor(Math.random() * 360));
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    generatePalette();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hslToHex = (h: number, s: number, l: number): string => {
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    const toHex = (x: number) => {
      const hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  const generateHarmonizedColors = (): string[] => {
    if (!colors.some((color) => color.locked)) {
      setBaseHue(Math.floor(Math.random() * 360));
    }

    const hue = baseHue;

    switch (colorScheme) {
      case "analogous":
        // Colors adjacent on the color wheel (30° apart)
        return [
          hslToHex((hue - 60) % 360, 70, 60),
          hslToHex((hue - 30) % 360, 70, 60),
          hslToHex(hue, 70, 60),
          hslToHex((hue + 30) % 360, 70, 60),
          hslToHex((hue + 60) % 360, 70, 60),
        ];

      case "monochromatic":
        // Different lightness/saturation of the same hue
        return [
          hslToHex(hue, 90, 30),
          hslToHex(hue, 80, 40),
          hslToHex(hue, 70, 50),
          hslToHex(hue, 60, 60),
          hslToHex(hue, 50, 70),
        ];

      case "complementary":
        // Base color, variations, and complement
        return [
          hslToHex(hue, 70, 40),
          hslToHex(hue, 70, 55),
          hslToHex(hue, 70, 70),
          hslToHex((hue + 180) % 360, 70, 55),
          hslToHex((hue + 180) % 360, 70, 70),
        ];

      case "triadic":
        // Three colors evenly spaced on the color wheel (120° apart)
        return [
          hslToHex(hue, 70, 60),
          hslToHex(hue, 50, 50),
          hslToHex((hue + 120) % 360, 70, 60),
          hslToHex((hue + 120) % 360, 50, 50),
          hslToHex((hue + 240) % 360, 70, 60),
        ];

      case "random":
      default:
        // Completely random colors
        return Array(5)
          .fill(0)
          .map(
            () =>
              `#${Math.floor(Math.random() * 16777215)
                .toString(16)
                .padStart(6, "0")}`
          );
    }
  };

  const generatePalette = () => {
    const harmonizedColors = generateHarmonizedColors();

    const newColors = Array.from({ length: 5 }, (_, index) => {
      const existingColor = colors[index];

      if (existingColor && existingColor.locked) {
        return existingColor;
      } else {
        return {
          id: existingColor?.id || crypto.randomUUID(),
          hex: harmonizedColors[index],
          locked: false,
          name: existingColor?.name || `Color ${index + 1}`,
        };
      }
    });

    setColors(newColors);
  };

  const toggleLock = (id: string) => {
    setColors(
      colors.map((color) =>
        color.id === id ? { ...color, locked: !color.locked } : color
      )
    );
  };

  const updateColorName = (id: string, newName: string) => {
    setColors(
      colors.map((color) =>
        color.id === id ? { ...color, name: newName } : color
      )
    );
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);

    toast({
      description: `Copied ${text} to clipboard`,
      duration: 2000,
    });
  };

  const exportPalette = () => {
    const paletteData = colors.map(({ hex, name }) => ({ hex, name }));
    const dataStr = JSON.stringify(paletteData, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(
      dataStr
    )}`;

    const exportName = "color-palette.json";

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportName);
    linkElement.click();
  };

  // Export as CSS variables
  const exportAsCss = () => {
    let cssText = ":root {\n";
    colors.forEach((color) => {
      const variableName = color.name.toLowerCase().replace(/\s+/g, "-");
      cssText += `  --${variableName}: ${color.hex};\n`;
    });
    cssText += "}";

    const dataUri = `data:text/css;charset=utf-8,${encodeURIComponent(
      cssText
    )}`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", "palette.css");
    linkElement.click();
  };

  const getContrastColor = (hexColor: string): string => {
    const r = Number.parseInt(hexColor.slice(1, 3), 16);
    const g = Number.parseInt(hexColor.slice(3, 5), 16);
    const b = Number.parseInt(hexColor.slice(5, 7), 16);

    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    return luminance > 0.5 ? "#000000" : "#ffffff";
  };

  return (
    <section id="color-palette-generator">
      <PlayGroundCard
        title="Color Palette Generator"
        description="Generate harmonious color palettes for your designs"
        footerText="Add something beautiful to the world"
        codeUrl={`${codeLinkBase}/src/app/playground/_components/color-palette-generator.tsx`}
        navUrl={`/playground${inline ? "/" : "#"}color-palette-generator`}
        inline={inline}
      >
        <div className="space-y-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <>
                Inspiration eludes me still{" "}
                <ChevronUp className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                Let&apos;s create <ChevronDown className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
          {isExpanded && (
            <div>
              <Toaster />
              <Card className="w-full max-w-5xl">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <div className="w-full sm:w-1/3">
                      <Label htmlFor="scheme-select">Color Scheme</Label>
                      <Select
                        value={colorScheme}
                        onValueChange={(value) =>
                          setColorScheme(value as ColorScheme)
                        }
                      >
                        <SelectTrigger id="scheme-select">
                          <SelectValue placeholder="Select scheme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="analogous">Analogous</SelectItem>
                          <SelectItem value="monochromatic">
                            Monochromatic
                          </SelectItem>
                          <SelectItem value="complementary">
                            Complementary
                          </SelectItem>
                          <SelectItem value="triadic">Triadic</SelectItem>
                          <SelectItem value="random">Random</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="w-full sm:w-2/3 flex justify-end gap-2">
                      <Button
                        onClick={generatePalette}
                        className="flex items-center gap-2"
                      >
                        <RefreshCw className="w-4 h-4" />
                        Generate
                      </Button>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              onClick={exportPalette}
                              variant="outline"
                              className="flex items-center gap-2"
                            >
                              <Download className="w-4 h-4" />
                              JSON
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Export as JSON file</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              onClick={exportAsCss}
                              variant="outline"
                              className="flex items-center gap-2"
                            >
                              <Download className="w-4 h-4" />
                              CSS
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Export as CSS variables</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-col space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-0 h-64 rounded-2xl overflow-hidden">
                      {colors.map((color) => (
                        <div
                          key={color.id}
                          className="h-full overflow-hidden flex flex-col"
                          style={{
                            backgroundColor: color.hex,
                            color: getContrastColor(color.hex),
                          }}
                        >
                          <div className="flex-1 p-4 flex flex-col justify-between">
                            <div className="flex justify-between">
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => toggleLock(color.id)}
                                className="h-8 w-8 bg-white/20 backdrop-blur-sm hover:bg-white/30"
                              >
                                {color.locked ? (
                                  <Lock className="h-4 w-4" />
                                ) : (
                                  <Unlock className="h-4 w-4" />
                                )}
                              </Button>

                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() =>
                                  copyToClipboard(color.hex, color.id)
                                }
                                className="h-8 w-8 bg-white/20 backdrop-blur-sm hover:bg-white/30"
                              >
                                {copied === color.id ? (
                                  <Check className="h-4 w-4" />
                                ) : (
                                  <Copy className="h-4 w-4" />
                                )}
                              </Button>
                            </div>

                            <div className="mt-auto">
                              <p className="font-mono text-sm font-bold mb-1">
                                {color.hex}
                              </p>
                              <Input
                                value={color.name}
                                onChange={(e) =>
                                  updateColorName(color.id, e.target.value)
                                }
                                className="bg-white/20 backdrop-blur-sm border-0 text-current placeholder:text-current/70"
                                style={{ color: getContrastColor(color.hex) }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex justify-between">
                  <p className="text-sm text-muted-foreground">
                    Lock and rename colors you want to keep when generating new
                    palettes
                  </p>
                </CardFooter>
              </Card>
            </div>
          )}
        </div>
      </PlayGroundCard>
    </section>
  );

  return (
    <div className="min-h-screen p-8 flex items-center justify-center bg-gray-50">
      <Toaster />
      <Card className="w-full max-w-5xl">
        <CardHeader>
          <CardTitle className="text-2xl">Color Palette Generator</CardTitle>
          <CardDescription>
            Generate harmonious color palettes for your designs
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="w-full sm:w-1/3">
                <Label htmlFor="scheme-select">Color Scheme</Label>
                <Select
                  value={colorScheme}
                  onValueChange={(value) =>
                    setColorScheme(value as ColorScheme)
                  }
                >
                  <SelectTrigger id="scheme-select">
                    <SelectValue placeholder="Select scheme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="analogous">Analogous</SelectItem>
                    <SelectItem value="monochromatic">Monochromatic</SelectItem>
                    <SelectItem value="complementary">Complementary</SelectItem>
                    <SelectItem value="triadic">Triadic</SelectItem>
                    <SelectItem value="random">Random</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="w-full sm:w-2/3 flex justify-end gap-2">
                <Button
                  onClick={generatePalette}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Generate
                </Button>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={exportPalette}
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        JSON
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Export as JSON file</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={exportAsCss}
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        CSS
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Export as CSS variables</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-0 h-64">
              {colors.map((color) => (
                <div
                  key={color.id}
                  className="h-full overflow-hidden flex flex-col"
                  style={{
                    backgroundColor: color.hex,
                    color: getContrastColor(color.hex),
                  }}
                >
                  <div className="flex-1 p-4 flex flex-col justify-between">
                    <div className="flex justify-between">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => toggleLock(color.id)}
                        className="h-8 w-8 bg-white/20 backdrop-blur-sm hover:bg-white/30"
                      >
                        {color.locked ? (
                          <Lock className="h-4 w-4" />
                        ) : (
                          <Unlock className="h-4 w-4" />
                        )}
                      </Button>

                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => copyToClipboard(color.hex, color.id)}
                        className="h-8 w-8 bg-white/20 backdrop-blur-sm hover:bg-white/30"
                      >
                        {copied === color.id ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>

                    <div className="mt-auto">
                      <p className="font-mono text-sm font-bold mb-1">
                        {color.hex}
                      </p>
                      <Input
                        value={color.name}
                        onChange={(e) =>
                          updateColorName(color.id, e.target.value)
                        }
                        className="bg-white/20 backdrop-blur-sm border-0 text-current placeholder:text-current/70"
                        style={{ color: getContrastColor(color.hex) }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">
            Lock colors you want to keep when generating new palettes
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
