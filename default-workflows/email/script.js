const $ = {
  ctx: {},
  flow: {
    loop: {
      item: {
        dueDate: "2024-01-07T13:48:58.490Z",
        amountDue: 100,
        amountPaid: 100,
        amountRemaining: 100,
      },
    },
    nodes: {
      obtem_tipo_pagador_fatura: [
        {
          output: "customer",
        },
      ],
      busca_dados_cliente: [
        {
          output: {
            body: {
              name: "John Doe",
              email: "",
            },
          },
        },
      ],
      busca_dados_operador: [
        {
          output: {
            body: {
              data: [
                {
                  name: "John Doe",
                  email: "",
                },
              ],
            },
          },
        },
      ],
    },
  },
};

const payerType = $.flow.nodes.obtem_tipo_pagador_fatura[0].output;
const DEFAULT_TIMEZONE = "America/Sao_Paulo";

const formatDatePtBr = (date, timeZone = DEFAULT_TIMEZONE) => {
  const formatter = new Intl.DateTimeFormat("pt-BR", {
    timeZone,
    dateStyle: "short",
  });

  return formatter.format(new Date(date));
};

const formatMonetaryValuePtBr = (value, options) => {
  const formatter = Intl.NumberFormat(
    "pt-BR",
    options ?? {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  );

  return formatter.format(value);
};

let payerData;
if (payerType === "customer") {
  payerData = $.flow.nodes.busca_dados_cliente[0].output.body;
} else {
  payerData = $.flow.nodes.busca_dados_operador[0].output.body?.data[0];
}

const templateData = {
  payer: payerData,
  invoice: {
    ...$.flow.loop.item,
    dueDate: formatDatePtBr($.flow.loop.item.dueDate),
    amountDue: formatMonetaryValuePtBr($.flow.loop.item.amountDue),
    amountPaid: formatMonetaryValuePtBr($.flow.loop.item.amountPaid),
    amountRemaining: formatMonetaryValuePtBr($.flow.loop.item.amountRemaining),
  },
};

$.ctx.data = templateData;
