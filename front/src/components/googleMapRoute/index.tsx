import React, { useEffect, useRef, useState } from "react"

export interface GoogleMapRouteProps {
  origem: string // Latitude e longitude da origem
  destino: string // Latitude e longitude do destino
}

const containerStyle = {
  width: "100%",
  height: "180px",
  borderRadius: "20px",
  overflow: "hidden",
}

// Função para carregar o script do Google Maps
const loadGoogleMapsScript = (apiKey: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (document.getElementById("google-maps-script")) {
      resolve()
      return
    }

    const script = document.createElement("script")
    script.id = "google-maps-script"
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=directions&v=weekly`
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error("Erro ao carregar o script do Google Maps"))
    document.head.appendChild(script)
  })
}

export function GoogleMapRoute({ origem = "37.7749145,-122.4193077", destino = "37.7759145,-122.4193077" }: GoogleMapRouteProps) {
  const mapRef = useRef<HTMLDivElement | null>(null)
  const directionsRenderer = useRef<google.maps.DirectionsRenderer | null>(null)
  const directionsService = useRef<google.maps.DirectionsService | null>(null)
  const [mapInitialized, setMapInitialized] = useState(false)

  const origemCoords = {
    lat: parseFloat(origem.split(",")[0]),
    lng: parseFloat(origem.split(",")[1]),
  }

  const destinoCoords = {
    lat: parseFloat(destino.split(",")[0]),
    lng: parseFloat(destino.split(",")[1]),
  }

  useEffect(() => {
    const initializeMap = async () => {
      try {
        await loadGoogleMapsScript(process.env.REACT_APP_GOOGLE_API_KEY as string)

        // @ts-ignore
        const { Map } = await google.maps.importLibrary("maps")

        if (!mapRef.current) return

        const map = new Map(mapRef.current, {
          zoom: 12,
          center: origemCoords,
          mapId: "DEMO_MAP_ID",
        })

        directionsService.current = new google.maps.DirectionsService()
        directionsRenderer.current = new google.maps.DirectionsRenderer()
        directionsRenderer.current.setMap(map)

        // Marcar a origem e o destino
        new google.maps.Marker({
          position: origemCoords,
          map: map,
          title: "Origem",
        })

        new google.maps.Marker({
          position: destinoCoords,
          map: map,
          title: "Destino",
        })

        setMapInitialized(true)
      } catch (error) {
        console.error("Erro ao inicializar o mapa:", error)
      }
    }

    if (!mapInitialized) {
      initializeMap()
    }
  }, [origemCoords, destinoCoords, mapInitialized])

  // Função para atualizar a rota sem reiniciar o mapa
  useEffect(() => {
    if (directionsService.current && directionsRenderer.current && mapInitialized) {
      directionsService.current.route(
        {
          origin: origemCoords,
          destination: destinoCoords,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (response, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            directionsRenderer.current?.setDirections(response)
          } else {
            console.error("Erro ao calcular a rota:", status)
          }
        }
      )
    }
  }, [origemCoords, destinoCoords, mapInitialized])

  return <div ref={mapRef} style={containerStyle}></div>
}
