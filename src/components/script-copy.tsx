"use client"

import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { IconCheck, IconCopy } from "@tabler/icons-react"
import { CodeBlock } from "./code-block"
import type { Language } from "prism-react-renderer"

interface ScriptCopyProps {
  language: Language
  commandMap: Record<string, string>
}

const CopyButton = ({ code }: { code: string }) => {
  const [copied, setCopied] = React.useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button variant="outline" size="icon" onClick={copyToClipboard}>
      {copied ? <IconCheck className="h-4 w-4" /> : <IconCopy className="h-4 w-4" />}
    </Button>
  )
}

export function ScriptCopy({ language, commandMap }: ScriptCopyProps) {
  const [selectedPackage, setSelectedPackage] = React.useState(Object.keys(commandMap)[0])

  return (
    <Tabs defaultValue={selectedPackage} onValueChange={setSelectedPackage} className="w-full">
      <div className="flex items-center justify-between">
        <TabsList>
          {Object.keys(commandMap).map((pkg) => (
            <TabsTrigger key={pkg} value={pkg}>
              {pkg}
            </TabsTrigger>
          ))}
        </TabsList>
          <CopyButton code={commandMap[selectedPackage]} />
      </div>
      {
        Object.keys(commandMap).map((pkg) => (
          <TabsContent key={pkg} value={pkg} className="text-sm">
            <CodeBlock code={commandMap[pkg]} language={language} />
          </TabsContent>
        ))
      }
    </Tabs>
  )
}
