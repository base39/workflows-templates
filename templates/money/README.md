# Money <!-- omit in toc -->

Templates de fluxos para cálculo de crédito.

- [Calcular crédito máximo](#calcular-crédito-máximo)
	- [Parâmetros](#parâmetros)
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

### Parâmetros
| Nome     | Tipo   | Obrigatório | Descrição             |
| -------- | ------ | ----------- | --------------------- |
| document | String | &check;     | Documento do cliente. |

### Corpo de requisição
| Nome              | Tipo   | Obrigatório | Descrição               |
| ----------------- | ------ | ----------- | ----------------------- |
| consignableMargin | Number | &check;     | Margem de consignado.   |
| fee               | Number | &check;     | Taxa de juros.          |
| iof               | String | &check;     | Taxa do IOF.            |
| product           | Object | &check;     | Informações do produto. |


<details>
    <summary><strong>Exemplo</strong></summary>

```json
{
	"consignableMargin": 0.35,
	"fee": 0.02,
	"iof": 0.035,
	"product": {
		"slug": "Consignado",
		"metdaData": {
			"maxNumberOfInstallments": 12,
			"minNumberOfInstallments": 6,
			"minLoanAmount": 1000
		}
	}
}
```

</details>

### Segredos

| Nome          | Descrição                    |
| ------------- | ---------------------------- |
| base39BaseUrl | URL base das APIs da Base39. |
| base39ApiKey  | Chave da API da Base39.      |

### Resposta

| Nome | Tipo                | Obrigatório | Descrição                                                    |
| ---- | ------------------- | ----------- | ------------------------------------------------------------ |
| data | Array&lt;Object&gt; | &check;     | Lista de cálculos realizados para cada vínculo empregatício. |

<details>
    <summary><strong>Exemplo</strong></summary>

```json
{
	"data": [
		{
			"slug": "Consignado",
			"name": "string",
			"description": "string",
			"maxLoanAmount": 54000,
			"minLoanAmount": 1000,
			"maxNumberOfInstallments": 12,
			"minNumberOfInstallments": 6,
			"maxInstallmentValue": 4600,
			"minInstallmentValue": 4500,
			"customer": "cust_635a97e17645c28b241c5910",
			"employment": "empl_63617dabd48049cdce44246f",
			"available": true,
			"metadata": {}
		},
		{
			"slug": "Consignado",
			"name": "string",
			"description": "string",
			"maxLoanAmount": 15000,
			"minLoanAmount": 1000,
			"maxNumberOfInstallments": 12,
			"minNumberOfInstallments": 6,
			"maxInstallmentValue": 1300,
			"minInstallmentValue": 1250,
			"customer": "cust_635a97e17645c28b241c5910",
			"employment": "empl_635a970bb8151436be63e365",
			"available": true,
			"metadata": {}
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
| Nome                 | Tipo                | Obrigatório | Descrição                                                                    |
| -------------------- | ------------------- | ----------- | ---------------------------------------------------------------------------- |
| numberOfInstallments | Array&lt;String&gt; | &check;     | Lista dos parcelamentos para serem calculados.                               |
| amount               | Number              | &check;     | Valor do empréstimo a ser simulado.                                          |
| employment           | String              | &check;     | Identificador do vínculo empregatício do cliente que solicitou o empréstimo. |


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
{
    "data": [
        {
            "allowed": true,
            "disbursementAmount": 10000,
            "installmentAmount": 488,
            "totalAmount": 11793,
            "iofAmount": 343,
            "monthlyCET": 2.19,
            "yearlyCET": 29.688,
            "monthlyFee": 1,
            "yearlyFee": 12.682,
            "insurance": {
                "type": "optional",
                "amount": 450,
                "fee": 4.5,
                "number": "12345.1234.1234.1234.123456",
                "insurer": "usebens"
            },
            "interestType": "pre_price_days",
            "creditOperationType": "ccb",
            "expectedDisbursementDate": "2022-11-22",
            "interestGracePeriod": 0,
            "principalGracePeriod": 0,
            "numberOfInstallments": 28,
            "firstDueDate": "2023-01-10",
            "fund": "fund_123456",
            "rebates": [
                {
                    "feeType": "tac",
                    "amountType": "absolute",
                    "amount": 1000
                },
                {
                    "fee_type": "tac_tax_free",
                    "amount_type": "absolute",
                    "description": "Prêmio de Seguro",
                    "amount": 450
                }
            ],
            "fine": {
                "fineRate": 0.02,
                "interestBase": "workdays",
                "monthlyRate": 0.01
            },
            "acquittanceLoans": []
        },
        {
            "allowed": false,
            "disbursementAmount": 10000,
            "installmentAmount": 1117,
            "totalAmount": 10705,
            "iofAmount": 205,
            "monthlyCET": 1.85,
            "yearlyCET": 24.604,
            "monthlyFee": 0.7,
            "yearlyFee": 8.731,
            "insurance": {
                "type": "uninsured",
                "amount": 0,
                "fee": 0,
                "number": "",
                "insurer": ""
            },
            "interestType": "pre_price_days",
            "creditOperationType": "ccb",
            "expectedDisbursementDate": "2022-11-22",
            "interestGracePeriod": 0,
            "principalGracePeriod": 0,
            "numberOfInstallments": 10,
            "firstDueDate": "2023-01-10",
            "fund": "fund_123456",
            "rebates": [
                {
                    "feeType": "tac",
                    "amountType": "absolute",
                    "amount": 500
                }
            ],
            "fine": {
                "fineRate": 0.02,
                "interestBase": "workdays",
                "monthlyRate": 0.01
            },
            "acquittanceLoans": []
        },
        {
            "allowed": true,
            "disbursementAmount": 10000,
            "installmentAmount": 352,
            "totalAmount": 11877,
            "iofAmount": 377,
            "monthlyCET": 2.31,
            "yearlyCET": 31.527,
            "monthlyFee": 1.5,
            "yearlyFee": 19.561,
            "insurance": {
                "type": "required",
                "amount": 179,
                "fee": 1.79,
                "number": "12345.1234.1234.1234.123456",
                "insurer": "usebens"
            },
            "interestType": "pre_price_days",
            "creditOperationType": "ccb",
            "expectedDisbursementDate": "2022-11-22",
            "interestGracePeriod": 0,
            "principalGracePeriod": 0,
            "numberOfInstallments": 48,
            "firstDueDate": "2023-01-10",
            "fund": "fund_123456",
            "rebates": [
                {
                    "feeType": "tac",
                    "amountType": "absolute",
                    "amount": 1500
                }
            ],
            "fine": {
                "fineRate": 0.02,
                "interestBase": "workdays",
                "monthlyRate": 0.01
            },
            "acquittanceLoans": []
        },
        {
            "allowed": true,
            "disbursementAmount": 10000,
            "installmentAmount": 469,
            "totalAmount": 11329,
            "iofAmount": 329,
            "monthlyCET": 1.89,
            "yearlyCET": 25.192,
            "monthlyFee": 1,
            "yearlyFee": 12.682,
            "insurance": {
                "type": "optional",
                "amount": 0,
                "fee": 0,
                "number": "",
                "insurer": ""
            },
            "interestType": "pre_price_days",
            "creditOperationType": "ccb",
            "expectedDisbursementDate": "2022-11-22",
            "interestGracePeriod": 0,
            "principalGracePeriod": 0,
            "numberOfInstallments": 28,
            "firstDueDate": "2023-01-10",
            "fund": "fund_123456",
            "rebates": [
                {
                    "feeType": "tac",
                    "amountType": "absolute",
                    "amount": 1000
                }
            ],
            "fine": {
                "fineRate": 0.02,
                "interestBase": "workdays",
                "monthlyRate": 0.01
            },
            "acquittanceLoans": []
        }
    ]
}
```

</details>

### Segredos

| Nome               | Descrição                                                                                  |
| ------------------ | ------------------------------------------------------------------------------------------ |
| base39BaseUrl      | URL base das APIs da Base39.                                                               |
| base39ApiKey       | Chave da API da Base39.                                                                    |
| qitechBaseUrl      | URL base das APIs da QITech.                                                               |
| qitechApiClientKey | Chave da API da QITech.                                                                    |
| qitechPassphrase   | Segredo utilizado para gerar a assinatura do payload à QITech. Pode ser vazio.             |
| qitechPrivateKey   | Chave privada utilizada para assinar o payload à QITech.                                   |
| qitechPublicKey    | Chave pública utilizada para verificar e descriptografar a resposta retornada pela QITech. |

