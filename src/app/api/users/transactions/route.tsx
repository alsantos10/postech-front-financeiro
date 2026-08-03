import { NextRequest, NextResponse } from "next/server";
import { OrderType } from "@/core/entities/DataGrid";
import { fetchTransactions } from "@/infra/api/JsonTransactionService";

export async function GET(request: NextRequest) {
    // console.log("GET /api/users", request.nextUrl.toString());
    try {
        const { searchParams } = request.nextUrl
        
        const page = parseInt(searchParams.get("page") || "1", 10);
        const limit = parseInt(searchParams.get("limit") || "10", 10);
        const sort = searchParams.get("sort") || "description";
        const order = (searchParams.get("order") || OrderType.ASC) as OrderType;
        const term = searchParams.get("term") || undefined;

        if (page < 1 || limit < 1) {
            return NextResponse.json({message: "Página ou limite devem ser maiores que ZERO"}, {status: 400});
        }

        const response = await fetchTransactions({page, limit, sort, order, term});
        if (!response) {
            return NextResponse.json({message: "Erro ao buscar dados das transações"}, {status: 400});
        }
        
        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.json({message: "Erro ao listar transações"}, {status: 500});
    }
}