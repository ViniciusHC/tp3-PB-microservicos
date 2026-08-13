import { useState, useEffect } from "react";
import "./Forum.css";
import { useNavigate } from "react-router-dom";


interface Forum {
    id: number,
    idUsuario: number;
    titulo: string;
    texto: string

}

function ForumPage() {

    const navigate = useNavigate();

    const [topico, setTopico] = useState({
        idUsuario: 0,
        titulo: '',
        texto: ''
    });

    const [topicos, setTopicos] = useState<Forum[]>([]);

    function limparFormulario() {
        setTopico({
            idUsuario: 0,
            titulo: '',
            texto: ''
        });
    }


    async function listarTopicos() {
        try {
            const resposta = await fetch("http://localhost:8085/forum-service/topicos");
            const data = await resposta.json();
            setTopicos(data);
        } catch (erro) {
            console.error("Erro ao listar topicos:", erro);
            alert("Erro de conexão ao buscar os topicos.");
        }
    }


    async function criarTopico(topico: Forum) {
        try {
            const resposta = await fetch("http://localhost:8085/forum-service/topicos", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(topico)
            });
            if (resposta.ok) {
                alert("Tópico cadastrado com sucesso!");
                limparFormulario();
                listarTopicos();
            } else {
                alert("Erro ao cadastrar o Tópico no servidor.");
            }
        } catch (erro) {
            console.error("Erro ao adicionar Tópico:", erro);
            alert("Erro de conexão ao cadastrar o jogo.");
        }
    }

    async function deletarTopico(topico: Forum) {
        try {
            const resposta = await fetch(`http://localhost:8085/forum-service/topicos/${topico.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (resposta.ok) {
                alert("Tópico excluído com sucesso!");
                listarTopicos();
            } else {
                alert("Erro ao excluir o tópico do servidor.");
            }
        } catch (erro) {
            console.error("Erro ao deletar tópico:", erro);
            alert("Erro de conexão ao excluir o tópico.");
        }
    }

    useEffect(() => {
        listarTopicos();
    }, [])

    return (
        <div>
            <h1>Forum sobre jogos</h1>
            <button onClick={() => navigate("/")}>Voltar para página principal</button>
            <div className="container">
                <h2>Tópicos</h2>
                <div className='lista-topicos'>
                    {topicos.map((topico) => (
                        <div className='card-jogo' key={topico.id}>
                            <p>{topico.titulo}</p>
                            <p>{topico.texto}</p>
                            <button type="button" onClick={() => deletarTopico(topico)}>Excluir Tópico</button>
                        </div>
                    ))
                    }
                </div>
                <h2>Cadastrar novo Tópico</h2>
                <form>
                    <p>Id do usuário</p>
                    <input
                        value={topico?.idUsuario}
                        className={'input'}
                        onChange={(e) => setTopico({ ...topico, idUsuario: Number(e.target.value)})}
                    />
                    <input
                        value={topico.titulo}
                        className='input'
                        placeholder='Título do Tópico'
                        onChange={(e) => setTopico({ ...topico, titulo: e.target.value })}
                    />
                    <textarea
                        value={topico.texto}
                        className='input'
                        placeholder='Resumo do tópico'
                        rows={4}
                        onChange={(e) => setTopico({ ...topico, texto: e.target.value })}
                    />
                    <button type="button" onClick={() => { criarTopico(topico) }}>Cadastrar Tópico</button>
                </form>
            </div>
        </div>
    )
}


export default ForumPage;