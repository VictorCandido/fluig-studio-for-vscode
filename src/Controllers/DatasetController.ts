import { IServer } from './../Interfaces/IServer';
import * as soap from 'soap';

export class DatasetController {
    private url: string;

    constructor() { 
        this.url = 'https://devfluig.iv2.com.br/webdesk/ECMDatasetService?wsdl';
    }

    public async lisAll() {
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
            console.log(datasets);

            // this.deleteDataset(server, '');
        } catch (error) {
            console.log(new Date(), '[ERROR] Falha ao listar datasets');
            console.dir(error);
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

                    // const datasets = resp.datasets.item.map((dataset: any) => dataset.$value);
                    resolve(true);
                });
            });
        });
    }
}