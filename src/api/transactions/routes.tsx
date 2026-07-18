export async function GET(pathUrl: string) {
    try {
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simula um atraso de 0.5 segundo

        const response = await fetch(`http://localhost:3000/api/${pathUrl}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to fetch transactions' }), { status: 500 });
    }
}