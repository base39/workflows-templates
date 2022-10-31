# Money <!-- omit in toc -->

Templates de fluxos para cálculo de crédito.

- [Calcular crédito máximo](#calcular-crédito-máximo)
  - [Corpo de requisição](#corpo-de-requisição)
  - [Segredos](#segredos)
  - [Resposta](#resposta)
- [Requisição POST Qitech](#requisição-post-qitech)
  - [Corpo de requisição](#corpo-de-requisição-1)
  - [Segredos](#segredos-1)
- [Calcular simulação](#calcular-simulação)
  - [Corpo de requisição](#corpo-de-requisição-2)
  - [Resposta](#resposta-1)
  - [Segredos](#segredos-2)


<br>

## Calcular crédito máximo

Tipo: **Webhook**

Template: [max-credit.yaml](./max-credit.yaml)

### Corpo de requisição
| Nome              | Tipo   | Obrigatório | Descrição             |
| ----------------- | ------ | ----------- | --------------------- |
| consignableMargin | Number | &check;     | Margem de consignado. |
| fee               | Number | &check;     | Taxa de juros.        |
| iof               | String | &check;     | Taxa do IOF.          |


<details>
    <summary><strong>Exemplo</strong></summary>

```json
{
	"consignableMargin": 0.35,
	"fee": 0.02,
	"iof": 0.035
}
```

</details>

### Segredos

| Nome          | Descrição                    |
| ------------- | ---------------------------- |
| base39BaseUrl | URL base das APIs da Base39. |
| base39ApiKey  | Chave da API da Base39.      |

### Resposta

| Nome | Tipo                | Obrigatório | Descrição                                          |
| ---- | ------------------- | ----------- | -------------------------------------------------- |
| data | Array&lt;Object&gt; | &check;     | Lista de cálculos realizados para cada modalidade. |

<details>
    <summary><strong>Exemplo</strong></summary>

```json
{
	"data": [
		{
			"withEnsurance": true,
			"maxInstallment": 1300,
			"maxCredit": 15000
		},
		{
			"withEnsurance": false,
			"maxInstallment": 1300,
			"maxCredit": 7500
		}
	]
}
```

</details>

<br>

## Requisição POST Qitech

Tipo: **Webhook**

Template: [request-qitech-post.yaml](./request-qitech-post.yaml)

### Corpo de requisição
| Nome | Tipo   | Obrigatório | Descrição                       |
| ---- | ------ | ----------- | ------------------------------- |
| data | Object | &check;     | Payload da requisição à Qitech. |
| path | String | &check;     | Rota/Recurso solicitado.        |

<details>
    <summary><strong>Exemplo</strong></summary>

```json
{
	"data": {
		"borrower": {
			"person_type": "natural"
		},
		"financial": {
			"monthly_interest_rate": 0.02,
			"fine_configuration": {
				"interest_base": "calendar_days",
				"monthly_rate": 0.01,
				"contract_fine_rate": 0.02
			},
			"number_of_installments": 6,
			"interest_grace_period": 0,
			"principal_grace_period": 0,
			"disbursement_date": "2022-12-12",
			"disbursed_amount": 5000,
			"interest_type": "pre_price_days",
			"first_due_date": "2022-12-30",
			"credit_operation_type": "ccb"
		}
	},
	"path": "/debt_simulation"
}
```

</details>

### Segredos

| Nome               | Descrição                                                                                  |
| ------------------ | ------------------------------------------------------------------------------------------ |
| qitechBaseUrl      | URL base das APIs da QITech.                                                               |
| qitechApiClientKey | Chave da API da QITech.                                                                    |
| qitechPassphrase   | Segredo utilizado para gerar a assinatura do payload à QITech. Pode ser vazio.             |
| qitechPrivateKey   | Chave privada utilizada para assinar o payload à QITech.                                   |
| qitechPublicKey    | Chave pública utilizada para verificar e descriptografar a resposta retornada pela QITech. |

<br>

## Calcular simulação

Tipo: **Webhook**

Template: [simulation.yaml](./simulation.yaml)

### Corpo de requisição
| Nome                 | Tipo                | Obrigatório | Descrição                                            |
| -------------------- | ------------------- | ----------- | ---------------------------------------------------- |
| numberOfInstallments | Array&lt;String&gt; | &check;     | Lista dos parcelamentos para serem calculados.       |
| amount               | Number              | &check;     | Valor do empréstimo a ser simulado.                  |
| customer             | String              | &check;     | Identificador do cliente que solicitou o empréstimo. |


<details>
    <summary><strong>Exemplo</strong></summary>

```json
{
    "numberOfInstallments": [
        6,
        12,
        24
    ],
    "amount": 999,
    "customer": "cust_abcdef123456"
}
```

</details>

### Resposta

| Nome | Tipo                | Obrigatório | Descrição                                                         |
| ---- | ------------------- | ----------- | ----------------------------------------------------------------- |
| -    | Array&lt;Object&gt; | &check;     | Lista das simulações realizadas para cada número de parcelamento. |

<details>
    <summary><strong>Exemplo</strong></summary>

```json
[
    {
        "amount": 999,
        "firstDueDate": "2022-12-30",
        "daysToIncrease": 0,
        "acquittanceLoans": [
            "loan_abcdef123456"
        ],
        "fund": "123456",
        "disbursementDate": "2022-10-31T14:30:18.103Z",
        "installments": [
            {
                "id": "c1226422-4bc5-418e-a2a2-4bec845e7ea5",
                "installments": 18,
                "allowed": true,
                "installmentValue": 629.14,
                "registerFee": 10,
                "iofValue": 251.81,
                "totalValue": 9252.81,
                "monthlyCET": 2.29,
                "yearlyCET": 31.219,
                "monthlyFee": 2,
                "yearlyFee": 26.824,
                "daysToIncrease": 0,
                "firstDueDate": "2022-12-30",
                "insuranceValue": 0,
                "insuranceType": "UNINSURED",
                "withInsurance": false,
                "insuranceFee": 0
            }
        ]
    }
]
```

</details>

### Segredos

| Nome               | Descrição                                                                                  |
| ------------------ | ------------------------------------------------------------------------------------------ |
| workflowsBaseUrl   | URL base do fluxo de cálculo de crédito máximo.                                            |
| base39BaseUrl      | URL base das APIs da Base39.                                                               |
| base39ApiKey       | Chave da API da Base39.                                                                    |
| qitechBaseUrl      | URL base das APIs da QITech.                                                               |
| qitechApiClientKey | Chave da API da QITech.                                                                    |
| qitechPassphrase   | Segredo utilizado para gerar a assinatura do payload à QITech. Pode ser vazio.             |
| qitechPrivateKey   | Chave privada utilizada para assinar o payload à QITech.                                   |
| qitechPublicKey    | Chave pública utilizada para verificar e descriptografar a resposta retornada pela QITech. |

