import axios from 'axios';
import { getUrlPdf } from '../utils/pablo';

export default function NFSE(company_ie, company_ie_st, company_cnpj_cpf, client_receiver_name, client_neighborhood, client_cep, invoice_issue, client_address, client_city_name, client_uf, client_ie, transport_amount_transported_volumes, transport_type_volumes_transported, client_phone_number, total, jsonprodutos) {
    return new Promise((resolve, reject) => {
        const url = 'http://demetertccbr.online:3000/teste';
        const formData = {
            nl_company_ie: company_ie,
            nl_company_ie_st: company_ie_st,
            nl_company_cnpj_cpf: company_cnpj_cpf,
            ds_client_receiver_name: client_receiver_name,
            ds_client_neighborhood: client_neighborhood,
            nu_client_cep: client_cep,
            dt_invoice_issue: invoice_issue,
            ds_client_address: client_address,
            ds_client_city_name: client_city_name,
            ds_client_uf: client_uf,
            ds_client_ie: client_ie,
            nu_transport_amount_transported_volumes: transport_amount_transported_volumes,
            ds_transport_type_volumes_transported: transport_type_volumes_transported,
            nl_client_phone_number: client_phone_number,
            vl_total: total,
            produtos: jsonprodutos
        };

        axios.post(url, formData)
            .then(response => {
                const teste = response.data;
                console.log('Variavel:', teste);
                console.log('Tipo variavel teste: ', typeof(teste));

                resolve(teste);
            })
            .catch(error => {
                console.error(error);
                reject(error); 
            });
    });
}