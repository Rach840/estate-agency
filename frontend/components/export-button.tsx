"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet } from "lucide-react";
import GET from "@/app/api/export-users/route";

export default function ExportButton({ response }) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const xlsx = await GET(response)
      const blob = await xlsx.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "недвижимость.xlsx";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Ошибка экспортирования продуктов:", error);
      alert("Ошибка экспортирования продуктов. Повторите попытку.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      onClick={handleExport}
      variant={"outline"}
      className=" text-white "
      title="Экспортировать продуктов"
      disabled={isExporting}
    >
      {isExporting ? "Экспорт..." : <FileSpreadsheet />}
    </Button>
  );
}
