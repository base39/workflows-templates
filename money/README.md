# Money

Templates de fluxos para cálculo de crédito.

<br>

## Calcular simulação

Template: [simulation.yaml](./simulation.yaml)

### Segredos

| Nome               | Descrição                                                                                  |
| ------------------ | ------------------------------------------------------------------------------------------ |
| workflowsBaseUrl   | URL base do fluxo de cálculo crédito máximo.                                               |
| base39BaseUrl      | URL base das APIs da Base39.                                                               |
| base39ApiKey       | Chave da API da Base39.                                                                    |
| qitechBaseUrl      | URL base das APIs da QITech.                                                               |
| qitechApiClientKey | Chave da API da QITech.                                                                    |
| qitechPassphrase   | Segredo utilizado para gerar a assinatura do payload à QITech. Pode ser vazio.             |
| qitechPrivateKey   | Chave privada utilizada para assinar o payload à QITech.                                   |
| qitechPublicKey    | Chave pública utilizada para verificar e descriptografar a resposta retornada pela QITech. |
