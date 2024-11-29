import React, { useEffect, useState } from "react"
import { Logo } from "../assets/img"
import * as Styles from "./style"
import { ButtonType } from "../components/buttons/button/interfaces"
import { Background } from "../components/inputs/input/interfaces"
import { JustifyType } from "../components/align/interfaces"
import {
  CardBase,
  Input,
  Text,
  Button,
  NavTab,
  GoogleMapRoute,
  DriverCard,
  DriverCardList,
  TravelCardList,
  SearchSelect,
} from "../components"
import { Align } from "../components/align/style"
import { Size } from "../components/text"
import {
  getRideDetails,
  patchRideConfirm,
  postRideEstimate,
} from "../service/api/shopper/rideService"

// const drivers = [
//   {
//     nome: "João Silva",
//     descricao: "Motorista experiente com 5 anos de atuação.",
//     stars: 4,
//     veiculo: "Toyota Corolla 2020",
//     valor: 150,
//   },
//   {
//     nome: "Maria Oliveira",
//     descricao: "Especialista em viagens longas e seguras.",
//     stars: 5,
//     veiculo: "Honda Civic 2021",
//     valor: 180,
//   },
// ]

// const travelData = [
//   {
//     nomeMotorista: "João da Silva",
//     data: new Date("2024-11-28"),
//     origem: "Rua A, São Paulo, SP",
//     destino: "Rua B, São Paulo, SP",
//     distancia: 10.5, // Em quilômetros
//     tempo: 25, // Em minutos
//     valor: 45.0, // Em reais
//   },
//   {
//     nomeMotorista: "Maria Oliveira",
//     data: new Date("2024-11-27"),
//     origem: "Avenida Paulista, São Paulo, SP",
//     destino: "Praça XV, Rio de Janeiro, RJ",
//     distancia: 430.0, // Em quilômetros
//     tempo: 300, // Em minutos
//     valor: 120.0, // Em reais
//   },
//   {
//     nomeMotorista: "Carlos Mendes",
//     data: new Date("2024-11-26"),
//     origem: "Rodovia dos Bandeirantes, Campinas, SP",
//     destino: "Rua das Flores, Belo Horizonte, MG",
//     distancia: 590.0, // Em quilômetros
//     tempo: 420, // Em minutos
//     valor: 200.0, // Em reais
//   },
//   {
//     nomeMotorista: "Ana Santos",
//     data: new Date("2024-11-25"),
//     origem: "Centro Histórico, Porto Alegre, RS",
//     destino: "Rua do Comércio, Curitiba, PR",
//     distancia: 710.0, // Em quilômetros
//     tempo: 480, // Em minutos
//     valor: 320.0, // Em reais
//   },
// ]

export function Access() {
  const [getNavTab, setNavTab] = useState(1)
  const [userId, setUserId] = useState("a88b4431-c676-4409-86c8-e1331a38546d")
  const [origin, setOrigin] = useState("37.7749145,-122.4193077")
  const [destination, setDestination] = useState("37.7749145,-122.4293077")
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [drivers, setDrivers] = useState<any[]>([])
  const [selectedDriver, setSelectedDriver] = useState<any>(null)
  const [getStartTrip, setStartTrip] = useState<any>(null)
  const [travels, setTravels] = useState<any>(null)
  const [idMotoristaSearchSelect, setIdMotoristaSearchSelect] = useState<
    number | null
  >(null)

  const showError = (message: string) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage("")
    }, 4000) // 5 segundos
  }

  const handleStartTrip = async () => {
    const requestBody = {
      customer_id: userId,
      origin: origin,
      destination: destination,
    }

    try {
      const response = await postRideEstimate(requestBody)
      const driverList = response.options.map((option: any) => ({
        id: option.id,
        nome: option.name,
        descricao: option.description,
        stars: option.review.rating,
        veiculo: option.vehicle,
        valor: option.value,
      }))
      setDrivers(driverList)
      setStartTrip(response)
      setNavTab(2)
    } catch (error: any) {
      if (error.response && error.response.data) {
        showError(
          `${error.response.data.error_code}: ${error.response.data.error_description}`
        )
      } else {
        showError("Erro desconhecido. Tente novamente.")
      }
    }
  }

  const handleCancel = () => {
    setUserId("")
    setOrigin("")
    setDestination("")
    setErrorMessage("")
  }

  const handleDriverSelect = (driver: any) => {
    setSelectedDriver(driver)
    localStorage.setItem("selectedDriver", JSON.stringify(driver))
  }

  useEffect(() => {
    const storedDriver = localStorage.getItem("selectedDriver")
    if (storedDriver) {
      setSelectedDriver(JSON.parse(storedDriver))
    }
  }, [])

  const handleConfirm = async () => {
    if (selectedDriver) {
      const rideConfirmBody = {
        customer_id: userId,
        driver_id: selectedDriver.id,
        origin: origin,
        destination: destination,
        value: selectedDriver.valor,
        vehicle: selectedDriver.veiculo,
        distance: getStartTrip.distance,
        duration: getStartTrip.duration,
        driver: {
          id: selectedDriver.id,
          name: selectedDriver.nome,
        },
      }

      try {
        const response = await patchRideConfirm(rideConfirmBody)
        setSelectedDriver(null)
        setNavTab(3)
      } catch (error: any) {
        if (error.response && error.response.data) {
          showError(
            `${error.response.data.error_code}: ${error.response.data.error_description}`
          )
        } else {
          showError("Erro desconhecido. Tente novamente.")
        }
      }
    } else {
      showError("Por favor, selecione um motorista")
    }
  }

  const handleTravels = async () => {
    if (idMotoristaSearchSelect) {
      try {
        const response = await getRideDetails(userId, idMotoristaSearchSelect)
        setTravels(response.rides)
      } catch (error: any) {
        if (error.response && error.response.data) {
          showError(
            `${error.response.data.error_code}: ${error.response.data.error_description}`
          )
        } else {
          showError("Erro desconhecido. Tente novamente.")
        }
      }
    } else {
      showError("Por favor, selecione um motorista motorista.")
    }
  }

  return (
    <Styles.PageContent>
      <Styles.Left>
        <Styles.BgImage />
      </Styles.Left>
      <Styles.Right>
        <Styles.ImgLogoInline src={Logo} />
        <Styles.Center>
          <Align alignCenter column gap="20px">
            <NavTab
              tabs={["Iniciar", "Solicitar", "Opções"]}
              activeTab={getNavTab}
              onTabClick={setNavTab}
            />

            {getNavTab === 1 && (
              <CardBase>
                <Align gap="30px" column>
                  <Text text="Iniciar Viagem" size={Size.L} center />
                  <Input
                    text="Id usuario"
                    background={Background.Secondary}
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                  />
                  <Input
                    text="Endereço de origem"
                    background={Background.Secondary}
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                  />
                  <Input
                    text="Endereço de destino"
                    background={Background.Secondary}
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                  {errorMessage && (
                    <p
                      style={{
                        color: "var(--red-primary)",
                        textAlign: "center",
                        fontWeight: 500,
                      }}
                    >
                      {errorMessage}
                    </p>
                  )}
                  <Align gap="20px" alignCenter justify={JustifyType.Center}>
                    <Button
                      text="Iniciar"
                      type={ButtonType.Primary}
                      onClick={handleStartTrip}
                    />
                    <Button
                      text="Cancelar"
                      type={ButtonType.Secondary}
                      onClick={handleCancel}
                    />
                  </Align>
                </Align>
              </CardBase>
            )}

            {getNavTab === 2 && (
              <CardBase>
                <Align gap="20px" column>
                  <Text text="Opções da Viagem" size={Size.L} center />
                  <GoogleMapRoute origem={origin} destino={destination} />
                  <Text text="Selecionar Motorista" size={Size.L} center />
                  <DriverCardList
                    list={drivers}
                    onSelect={handleDriverSelect}
                  />

                  {errorMessage && (
                    <p
                      style={{
                        color: "var(--red-primary)",
                        textAlign: "center",
                        fontWeight: 500,
                      }}
                    >
                      {errorMessage}
                    </p>
                  )}

                  <Align gap="20px" alignCenter justify={JustifyType.Center}>
                    <Button
                      text="Confirmar"
                      type={
                        selectedDriver
                          ? ButtonType.Primary
                          : ButtonType.Disabled
                      }
                      onClick={handleConfirm}
                    />
                    <Button text="Cancelar" type={ButtonType.Secondary} />
                  </Align>
                </Align>
              </CardBase>
            )}

            {getNavTab === 3 && (
              <CardBase>
                <Align gap="30px" column>
                  <Text text="Histórico de Viagens" size={Size.L} center />
                  <Input
                    text="Id usuario"
                    background={Background.Secondary}
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                  />
                  <SearchSelect
                    placeholder="Buscar motorista"
                    onChange={(e) =>
                      setIdMotoristaSearchSelect(Number(e.target.value))
                    } // Agora recebe apenas o 'id' do motorista
                  />

                  {errorMessage && (
                    <p
                      style={{
                        color: "var(--red-primary)",
                        textAlign: "center",
                        fontWeight: 500,
                      }}
                    >
                      {errorMessage}
                    </p>
                  )}

                  <Align gap="20px" alignCenter justify={JustifyType.Center}>
                    <Button
                      text="Buscar"
                      type={
                        idMotoristaSearchSelect
                          ? ButtonType.Primary
                          : ButtonType.Disabled
                      }
                      onClick={handleTravels}
                    />
                    <Button text="Cancelar" type={ButtonType.Secondary} />
                  </Align>

                  <TravelCardList list={travels} />
                </Align>
              </CardBase>
            )}
          </Align>
        </Styles.Center>
      </Styles.Right>
    </Styles.PageContent>
  )
}
