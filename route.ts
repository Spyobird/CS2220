import { NextRequest, NextResponse } from "next/server"
import prisma from "../../prisma/client"

export async function POST(request: NextRequest) {
  try {
    var query = await request.json()
    console.log(query)
    const data = await prisma.entry.findMany(query)
    // console.log(data)
    return NextResponse.json(data)
  } catch (e) {
    return NextResponse.error()
  }
}

var local_data = [
  {
    id: 1,
    proteinName: 'POU domain, class 2, transcription factor 1 ',
    proteinSource: 'Homo sapiens (Human)',
    length: 743,
    uniprotId: 'P14859',
    mutation: 'wild',
    nucleicAcidName: 'ds DNA',
    nucleicAcidType: 'DNA',
    pH: 7.5,
    temperature: 273,
    method: 'Gel shift',
    dG: -9.31,
    ddG: null,
    year: '1997',
    author: 'van Leeuwen HC, Strating MJ, Rensen M, de Laat W, van der Vliet PC',
    journal: 'EMBO J',
    keywords: [
      'POU domain transcription factors',
      'DNA recognition',
      'DNase I footprinting'
    ]
  }
]