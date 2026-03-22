#!/bin/bash

# Configurações
URL="http://localhost:4000/api/v1"
HEADER="Content-Type: application/json"

clear
echo "-----------------------------------------------"
echo "    TESTE DO SISTEMA DE FROTA (PORTA 4000)     "
echo "-----------------------------------------------"

# 1. Checa se o servidor está de pé
echo "Verificando se o servidor ja esta ligado..."
if ! curl -s -m 2 "$URL" > /dev/null; then
    echo "-----------------------------------------------"
    echo "  [AVISO] SERVIDOR OFFLINE. LIGANDO DOCKER...  "
    echo "-----------------------------------------------"
    docker compose up -d
    echo -n "Aguardando o container responder"
    while [ "$(curl -s -o /dev/null -w "%{http_code}" "$URL")" == "000" ]; do
        printf "."
        sleep 3
    done
    echo -e "\nTudo pronto!"
else
    echo "O servidor ja esta rodando. Pulando o boot."
fi

# --- PASSO 1: MOTORISTA ---
echo ""
echo ">>> PASSO 1: CADASTRAR MOTORISTA"
read -p "Digite o nome: " NOME
read -p "Digite a CNH: " CNH

# O segredo aqui é garantir que o -d receba a string entre aspas duplas corretamente
RES_MOT=$(curl -s -X POST "$URL/motoristas" -H "$HEADER" -d "{\"nome\":\"$NOME\",\"cnh\":\"$CNH\"}")
echo "Resposta do servidor: $RES_MOT"

# O sed tenta extrair apenas o valor do ID (o UUID)
ID_MOT=$(echo "$RES_MOT" | sed -n 's/.*"id":"\([^"]*\)".*/\1/p')

if [ -z "$ID_MOT" ]; then
    echo "ERRO: Nao foi possivel obter o ID do Motorista. Verifique a resposta acima."
    exit 1
fi
echo "ID salvo: $ID_MOT"

# --- PASSO 2: AUTOMOVEL ---
echo ""
echo ">>> PASSO 2: CADASTRAR CARRO"
read -p "Placa: " PLACA
read -p "Marca: " MARCA

RES_AUT=$(curl -s -X POST "$URL/automoveis" -H "$HEADER" -d "{\"placa\":\"$PLACA\",\"marca\":\"$MARCA\"}")
echo "Resposta do servidor: $RES_AUT"

ID_AUT=$(echo "$RES_AUT" | sed -n 's/.*"id":"\([^"]*\)".*/\1/p')

if [ -z "$ID_AUT" ]; then
    echo "ERRO: Nao foi possivel obter o ID do Automovel."
    exit 1
fi
echo "ID salvo: $ID_AUT"

# --- PASSO 3: VINCULAR ---
echo ""
echo ">>> PASSO 3: VINCULAR (RETIRADA DO CARRO)"
echo "Aperte ENTER para confirmar que o $NOME pegou o carro $PLACA"
read

RES_USO=$(curl -s -X POST "$URL/registros-uso" -H "$HEADER" -d "{\"idMotorista\":\"$ID_MOT\",\"idAutomovel\":\"$ID_AUT\"}")
echo "Resposta do servidor: $RES_USO"

ID_USO=$(echo "$RES_USO" | sed -n 's/.*"id":"\([^"]*\)".*/\1/p')

# --- PASSO 4: FINALIZAR ---
echo ""
echo ">>> PASSO 4: DEVOLUÇÃO"
echo "Quando o motorista devolver o carro, aperte ENTER para finalizar o uso $ID_USO"
read

curl -s -X PATCH "$URL/registros-uso/$ID_USO/finalizar" -H "$HEADER"
echo -e "\nFluxo finalizado com sucesso!"

echo "-----------------------------------------------"
read -p "Fim do teste. Aperte ENTER para fechar."