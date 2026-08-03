import { OrderType } from "@/core/entities/DataGrid";
import { fetchTransactions } from "@/infra/api/JsonTransactionService";
import { useAuth } from "@/ui/context/AuthContext";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

    try {
        const { searchParams } = request.nextUrl
        
        const page = parseInt(searchParams.get("page") || "1", 10);
        const limit = parseInt(searchParams.get("limit") || "10", 10);
        const sort = searchParams.get("sort") || "name";
        const order = (searchParams.get("order") || OrderType.ASC) as OrderType;
        const term = searchParams.get("term") || undefined;
        const userId = searchParams.get("userId") || undefined;

        if (page < 1 || limit < 1) {
            return NextResponse.json({message: "Página ou limite devem ser maiores que ZERO"}, {status: 400});
        }

        const response = await fetchTransactions({page, limit, sort, order, term, userId});
        if (!response) {
            return NextResponse.json({message: "Erro ao buscar dados das transações"}, {status: 404});
        }
        
        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.json({message: "Erro ao listar transações"}, {status: 500});
    }
}

export async function POST(pathUrl: string, body: any): Promise<Response> {
    try {
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simula um atraso de 0.5 segundo
        const response = await fetch(`http://localhost:3000/api/${pathUrl}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        const data = await response.json();
        return new Response(JSON.stringify(data), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to create transaction' }), { status: 500 });
    }
}