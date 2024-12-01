# shopper

<details>
<summary>API</summary>
  
- https://shopper-0tsi.onrender.com/api

| Metodo |  Rota | Descricao |
|---|---|---|
| POST | user/create-driver | cadastrar motorista no banco |
| POST | user/create-passenger | cadastrar passageiro no banco |
| POST | user/create-vehicle | cadastrar veículo no banco |
| GET | user/driver | listar motoristas |
| GET | user/passenger | listar passageiros |
| GET | user/vehicle | listar veículos |
| POST | ride/estimate | calcula o trajeto e mostra o motorista |
| PATCH | ride/confirm | salva a viagem no banco |
| PATCH | {driver_id}/ride/{customer_id} | busca historico de viagens |

- Integrado aos serviços do google: Directions API, Routes API

</details>

<details>
<summary>Front web</summary>
  
- https://shopper-ashy-three.vercel.app/
- Integrado aos serviços do google: Directions API, Maps API

</details>


<details>
<summary>Banco de dados</summary>
  
- banco postgres SQL


</details>
