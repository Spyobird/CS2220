"use client"

import useSWR from "swr"
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,
  Input,
  Button
} from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import useSWRMutation from "swr/mutation";

var columns = [
  {
    key: "proteinName",
    label: "Protein Name",
  },
  {
    key: "proteinSource",
    label: "Protein Source",
  },
  {
    key: "length",
    label: "Length",
  },
  {
    key: "uniprotId",
    label: "UniProt Id",
  },
  {
    key: "mutation",
    label: "Mutation Protein",
  },
  {
    key: "nucleicAcidName",
    label: "Nucleic Acid Name",
  },
  {
    key: "nucleicAcidType",
    label: "Nucleic Acid Type",
  },
  {
    key: "pH",
    label: "pH",
  },
  {
    key: "temperature",
    label: "Temperature",
  },
  {
    key: "method",
    label: "Method",
  },
  {
    key: "dG",
    label: "\u0394G",
  },
  {
    key: "ddG",
    label: "\u0394\u0394G",
  },
  {
    key: "year",
    label: "Year",
  },
  {
    key: "author",
    label: "Author",
  },
  {
    key: "journal",
    label: "Journal",
  },
  {
    key: "keywords",
    label: "Keywords",
  },
]

const fetcher = (...args) => fetch(...args).then((res) => res.json())

function FetchData(body) {
  const { data, error } = useSWR('/api', url => fetcher(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  }))

  return { data, error }
}

function sendRequest(url, { arg }) {
  return fetcher(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(arg)
  })
}
 
function LoadTable(data, error) {
  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>
  return (
    <Table aria-label="Entries Table">
      <TableHeader columns={columns}>
        {column => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={data} emptyContent={"No rows to display."}>
        {item => (
          <TableRow key={item.id}>
            {columnKey => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

function InitSearch(f) {
    const proteinNameRef = useRef(null)
    const proteinSourceRef = useRef(null)
    const lengthRef = useRef(null)
    const lengthCmpRef = useRef(null)
    const uniprotIdRef = useRef(null)
    const mutationRef = useRef(null)
    const nucleicAcidNameRef = useRef(null)
    const nucleicAcidTypeRef = useRef(null)
    const pHRef = useRef(null)
    const pHCmpRef = useRef(null)
    const temperatureRef = useRef(null)
    const temperatureCmpRef = useRef(null)
    const methodRef = useRef(null)
    const dGRef = useRef(null)
    const dGCmpRef = useRef(null)
    const ddGRef = useRef(null)
    const ddGCmpRef = useRef(null)
    const yearRef = useRef(null)
    const authorRef = useRef(null)
    const journalRef = useRef(null)
    const keywordsRef = useRef(null)

    function handleClick(e) {

      var query = {
        where: {
          proteinName: {
            contains: proteinNameRef.current.value,
            mode: "insensitive"
          },
          proteinSource: {
            contains: proteinSourceRef.current.value,
            mode: "insensitive"
          },
          length: {},
          uniprotId: {
            contains: uniprotIdRef.current.value,
            mode: "insensitive"
          },
          mutation: {
            contains: mutationRef.current.value,
            mode: "insensitive"
          },
          nucleicAcidName: {
            contains: nucleicAcidNameRef.current.value,
            mode: "insensitive"
          },
          nucleicAcidType: {
            contains: nucleicAcidTypeRef.current.value,
            mode: "insensitive"
          },
          pH: {},
          temperature: {},
          method: {
            contains: methodRef.current.value,
            mode: "insensitive"
          },
          dG: {},
          ddG: {},
          year: {
            contains: yearRef.current.value,
            mode: "insensitive"
          },
          author: {
            contains: authorRef.current.value,
            mode: "insensitive"
          },
          journal: {
            contains: journalRef.current.value,
            mode: "insensitive"
          },
          keywords: {
            contains: keywordsRef.current.value,
            mode: "insensitive"
          },
        }
      }
      if (lengthRef.current.value != "") query.where.length[lengthCmpRef.current.value] = parseInt(lengthRef.current.value)
      if (pHRef.current.value != "") query.where.pH[pHCmpRef.current.value] = parseFloat(pHRef.current.value)
      if (temperatureRef.current.value != "") query.where.temperature[temperatureCmpRef.current.value] = parseFloat(temperatureRef.current.value)
      if (dGRef.current.value != "") query.where.dG[dGCmpRef.current.value] = -parseFloat(dGRef.current.value)
      if (ddGRef.current.value != "") query.where.ddG[ddGCmpRef.current.value] = parseFloat(ddGRef.current.value)
      f(query)
    }

    return (
      <div className="w-full flex flex-col gap-4">
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input ref={proteinNameRef} isClearable label="Protein Name" placeholder="Enter value"/>
          <Input ref={proteinSourceRef} isClearable label="Protein Source" placeholder="Enter value"/>
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input ref={nucleicAcidNameRef} isClearable label="Nucleic Acid Name" placeholder="Enter value"/>
          <Input ref={nucleicAcidTypeRef} isClearable label="Nucleic Acid Type" placeholder="Enter value"/>
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input ref={uniprotIdRef} isClearable label="UniProt ID" placeholder="Enter value"/>
          <Input ref={mutationRef} isClearable label="Mutation Protein" placeholder="Enter value"/>
          <Input ref={methodRef} isClearable label="Method" placeholder="Enter value"/>
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input ref={lengthRef} type="number" label="Length" placeholder="700"
            endContent={
            <div className="flex items-center">
              <label className="sr-only" htmlFor="comparison">
                Comparison
              </label>
              <select
                ref={lengthCmpRef}
                className="outline-none border-0 bg-transparent text-default-400 text-small"
                id="comparison"
                name="comparison"
              >
                <option value="gte">Greater</option>
                <option value="lte">Lesser</option>
              </select>
            </div>
          }/>
          <Input ref={pHRef} type="number" label="pH" placeholder="7.0"
          endContent={
            <div className="flex items-center">
              <label className="sr-only" htmlFor="comparison">
                Comparison
              </label>
              <select
                ref={pHCmpRef}
                className="outline-none border-0 bg-transparent text-default-400 text-small"
                id="comparison"
                name="comparison"
              >
                <option value="gte">Greater</option>
                <option value="lte">Lesser</option>
              </select>
            </div>
          }/>
          <Input ref={temperatureRef} type="number" label="Temperature" placeholder="273.0"
          endContent={
            <div className="flex items-center">
              <label className="sr-only" htmlFor="comparison">
                Comparison
              </label>
              <select
                ref={temperatureCmpRef}
                className="outline-none border-0 bg-transparent text-default-400 text-small"
                id="comparison"
                name="comparison"
              >
                <option value="gte">Greater</option>
                <option value="lte">Lesser</option>
              </select>
            </div>
          }/>
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input ref={dGRef} type="number" label="&Delta;G" placeholder="5.00"
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">-</span>
              </div>
            }
            endContent={
              <div className="flex items-center">
                <label className="sr-only" htmlFor="comparison">
                  Comparison
                </label>
                <select
                  ref={dGCmpRef}
                  className="outline-none border-0 bg-transparent text-default-400 text-small"
                  id="comparison"
                  name="comparison"
                >
                  <option value="gte">Greater</option>
                  <option value="lte">Lesser</option>
                </select>
              </div>
            }/>
          <Input ref={ddGRef} type="number" label="&Delta;&Delta;G" placeholder="0.00"
          endContent={
            <div className="flex items-center">
              <label className="sr-only" htmlFor="comparison">
                Comparison
              </label>
              <select
                ref={ddGCmpRef}
                className="outline-none border-0 bg-transparent text-default-400 text-small"
                id="comparison"
                name="comparison"
              >
                <option value="gte">Greater</option>
                <option value="lte">Lesser</option>
              </select>
            </div>
          }/>
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input ref={yearRef} isClearable type="number" label="Year" placeholder="Enter value"/>
          <Input ref={authorRef} isClearable label="Author" placeholder="Enter value"/>
          <Input ref={journalRef} isClearable label="Journal" placeholder="Enter value"/>
          <Input ref={keywordsRef} isClearable label="Keywords" placeholder="Enter value"/>
        </div>
        <div className="flex gap-4 items-center self-center">
          <Button onPress={handleClick} size="lg">Search</Button>
        </div>
      </div>
    )
}

export default function Home() {
  const [query, setQuery] = useState({})

  const { trigger, data, error } = useSWRMutation("/api", sendRequest)

  var table = LoadTable(data, error)
  useEffect(() => { trigger(query) }, [trigger, query])

  function updateTable(q) {
    setQuery(q);
  }

  return (
    <main>
      <div className="container mx-auto space-y-8">
        <h1 className="text-center mt-4 py-8 text-3xl font-bold">Protein Nucleotide Database</h1>
        {InitSearch(updateTable)}
        {table}
      </div>
    </main>
  )
}
