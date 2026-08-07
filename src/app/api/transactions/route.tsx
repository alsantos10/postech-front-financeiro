import { OrderType } from "@/core/entities/DataGrid";
import { findUserByEmail } from "@/infra/api/JsonAuthService";
import { fetchTransactions } from "@/infra/api/JsonTransactionService";
import { getSessionCookie } from "@/infra/cookies/CookieTokenStorage";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = request.nextUrl
        
        const page = parseInt(searchParams.get("page") || "1", 10);
        const limit = parseInt(searchParams.get("limit") || "10", 10);
        const sort = searchParams.get("sort") || "name";
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
            return NextResponse.json({message: "Erro ao buscar dados das transações"}, {status: 404});
        }
        
        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.json({message: "Erro ao listar transações"}, {status: 500});
    }
}
