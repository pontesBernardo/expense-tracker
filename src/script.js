function getElementID(id) {
    return document.getElementById(id)
} //function para obter os elementos pelo id

const cards = {
    totalBalance: getElementID('saldoTotal'),
    totalIncome: getElementID('rendaTotal'),
    totalExpenses: getElementID('despesaTotal'),
} //objeto contendo os elementos que vão conter os numeros reais

const inputs = {
    transactionType: getElementID('tipoTransacao'),
    transactionValue: getElementID('valorTransacao'),
    transactionDescription: getElementID('descricaoTransacao'),
    transactionCategory: getElementID('categoriaTransacao'),
} //objeto contendo os inputs da aplicação

const buttons = {
    addTransaction: getElementID('btnTransacao'),
} //objeto contendo os botões da aplicação

const transactionForm = getElementID('transactionForm') //obtendo o formulario de adicionar transacoes
const transactionList = getElementID('transactionList')

const transactions = [] //array vazia que vai contar as infos da transacao

function addTransaction() {
    const transactionType = inputs.transactionType.value.trim()
    const transactionValue = parseFloat(inputs.transactionValue.value)
    const transactionDescription = inputs.transactionDescription.value.trim()
    const transactionCategory = inputs.transactionCategory.value.trim()

    const transaction = { 
        type: transactionType, 
        value: transactionValue, 
        description: transactionDescription, 
        category: transactionCategory,
        date: new Date().toLocaleDateString("pt-BR"),
    }

    transactions.push(transaction)

    createTransaction()
    updateBalance()
    transactionForm.reset()
} //function para criar uma transação

transactionForm.addEventListener('submit', (event) => {
    event.preventDefault() // evita recarregar a página
    addTransaction()
}) //chama a função addTransaction assim que envia o formulario

function createTransaction() {
    const lastTransaction = transactions[transactions.length - 1]
    const isIncome = lastTransaction.type === "Renda"

    const transactionHTML = `
        <div class="flex items-center justify-between border border-black/10 rounded-md px-4 py-2">
            <div class="flex flex-col">
                <span class="font-medium text-slate-800">${lastTransaction.description}</span>
                <span class="text-xs text-slate-500">${lastTransaction.type} • ${lastTransaction.category}</span>
            </div>
            <div class="${isIncome ? 'text-emerald-600' : 'text-rose-600'} font-semibold">
                ${isIncome ? '+' : '-'} R$ ${lastTransaction.value.toFixed(2).replace('.', ',')}
            </div>
        </div>
    `

    transactionList.insertAdjacentHTML("beforeend", transactionHTML)
} //funcao para criar uma transação na lista de transações 

function updateBalance() {
    let totalIncome = 0
    let totalExpenses = 0

    transactions.forEach(({ type, value }) => {
        if (type === "Renda") {
            totalIncome += value
        } else if (type === "Despesa") {
            totalExpenses += value
        }
    })

    const totalBalance = totalIncome - totalExpenses

    cards.totalIncome.textContent = `R$ ${totalIncome.toFixed(2).replace('.', ',')}`
    cards.totalExpenses.textContent = `R$ ${totalExpenses.toFixed(2).replace('.', ',')}`
    cards.totalBalance.textContent = `R$ ${totalBalance.toFixed(2).replace('.', ',')}`
} //funcao para atualizar os 3 cards com os seus valores reais