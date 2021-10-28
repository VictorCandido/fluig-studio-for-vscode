import * as soap from 'soap';
import fs from 'fs';
import path from 'path';

import { IServer } from './../Interfaces/IServer';
export class DatasetController {
    private url: string;

    constructor() { 
        this.url = 'https://devfluig.iv2.com.br/webdesk/ECMDatasetService?wsdl';
    }

    public async listAll() {
        try {
            const server: IServer = {
                description: 'Dev Iv2',
                host: 'https://devfluig.iv2.com.br',
                port: 443,
                user: 'victor.candido',
                password: 'totvs@iv2',
                companyId: 1
            }

            const datasets = await this.listDatasets(server);
            return { datasets };
        } catch (error) {
            console.log(new Date(), '[ERROR] Falha ao listar datasets');
            console.dir(error);
        }
    }

    public async uploadDataset() {
        try {
            const datasetName = 'ds_teste_victorcandido2';
            const tempFilesUrl = path.join(__dirname, '..', '..', 'temp', datasetName + '.js');
            const content = fs.readFileSync(tempFilesUrl, 'utf8');
            console.log(content);

            const server: IServer = {
                description: 'Dev Iv2',
                host: 'https://devfluig.iv2.com.br',
                port: 443,
                user: 'victor.candido',
                password: 'totvs@iv2',
                companyId: 1
            }

            const datasetContent = {
                name: datasetName,
                description: datasetName,
                content
            }

            const response = await this.addDataset(server, datasetContent);
            console.log(response)
        } catch (error: any) {
            console.log(new Date(), '[ERROR] Falha no deploy do dataset');
            console.dir(error.toString());
        }
    }

    private listDatasets(server: IServer): Promise<Array<string>> {
        return new Promise((resolve, reject) => {
            const payload = { 
                companyId: server.companyId, 
                username: server.user, 
                password: server.password
            }

            soap.createClient(this.url, (err: any, client: any) => {
                if (err) {
                    console.log(new Date(), '[ERROR] Falha na leitura do client');
                    console.dir(err);
                    reject(err);
                }
            
                client.getAvailableDatasets(payload, (err: any, resp: any) => {
                    if (err) {
                        console.log(new Date(), '[ERROR] Falha na consulta dos datasets');
                        console.dir(err);
                        reject(err);
                    }
            
                    const datasets = resp.datasets.item.map((dataset: any) => dataset.$value);
                    resolve(datasets);
                });
            });
        });
    }

    private async addDataset(server: IServer, datasetContent: any): Promise<any> {
        return new Promise((resolve, reject) => {
            const payload = { 
                companyId: server.companyId, 
                username: server.user, 
                password: server.password,
                name: datasetContent.name,
                description: datasetContent.description,
                impl: datasetContent.content
            }

            console.log('payload', payload)

            soap.createClient(this.url, (err: any, client: any) => {
                if (err) {
                    console.log(new Date(), '[ERROR] Falha na leitura do client');
                    console.dir(err);
                    reject(err);
                }
            
                client.addDataset(payload, (err: any, resp: any) => {
                    if (err) {
                        console.log(new Date(), '[ERROR] Falha no deploy do dataset');
                        console.dir(err);
                        reject(err);
                    }
            
                    resolve(resp);
                });
            });
        });
    }

    private deleteDataset(server: IServer, datasetName: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const payload = { 
                companyId: server.companyId, 
                username: server.user, 
                password: server.password,
                name: datasetName
            }

            soap.createClient(this.url, (err: any, client: any) => {
                if (err) {
                    console.log(new Date(), '[ERROR] Falha na leitura do client');
                    console.dir(err);
                    reject(err);
                }
            
                client.deleteDataset(payload, (err: any, resp: any) => {
                    if (err) {
                        console.log(new Date(), '[ERROR] Falha ao deletar dataset');
                        console.dir(err);
                        reject(err);
                    }

                    console.log(new Date(), '[INFO] Dataset deletado com sucesso');
                    console.dir(resp);

                    resolve(true);
                });
            });
        });
    }
}