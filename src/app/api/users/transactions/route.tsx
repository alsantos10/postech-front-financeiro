import { NextRequest, NextResponse } from "next/server";
import { OrderType } from "@/core/entities/DataGrid";
import { createTransaction, fetchTransactions } from "@/infra/api/JsonTransactionService";
import { getSessionCookie } from "@/infra/cookies/CookieTokenStorage";
import { findUserByEmail } from "@/infra/api/JsonAuthService";

export async function GET(request: NextRequest) {
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
        
        const email = await getSessionCookie();
        if (!email) {
            return NextResponse.json({message: "Usuário não autenticado"}, {status: 401});
        }
        const user = await findUserByEmail(email);
        if (!user) {
            return NextResponse.json({message: "Usuário não encontrado"}, {status: 404});
        }

        const response = await fetchTransactions({page, limit, sort, order, term, user});
        if (!response) {
            return NextResponse.json({message: "Erro ao buscar dados das transações"}, {status: 400});
        }
        
        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.json({message: "Erro ao listar transações"}, {status: 500});
    }
}

export async function POST(request: NextRequest) {
    try {
        const {amount, description, type} = await request.json();
        
        if (!amount || !description || !type) {
            return NextResponse.json({message: "Todos os campos são obrigatórios"}, {status: 400});
        }
        const email = await getSessionCookie();
        if (!email) {
            return NextResponse.json({message: "Usuário não autenticado"}, {status: 401});
        }
        const user = await findUserByEmail(email);
        if (!user) {
            return NextResponse.json({message: "Usuário não encontrado"}, {status: 404});
        }
        const transaction = await createTransaction(description, amount, type, user);
        return NextResponse.json(transaction, {status: 201});
    } catch (error) {
        return NextResponse.json({message: "Erro ao criar transação"}, {status: 500});
    }
}
