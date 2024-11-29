import React, { useEffect, useRef } from "react"

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

const loadGoogleMapsScript = (apiKey: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (document.getElementById("google-maps-script")) {
      resolve()
      return
    }

    const script = document.createElement("script")
    script.id = "google-maps-script"
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=&v=weekly`
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error("Erro ao carregar o script do Google Maps"))
    document.head.appendChild(script)
  })
}

export function GoogleMapRoute({ origem = "37.7749145,-122.4193077", destino = "37.7759145,-122.4193077" }: GoogleMapRouteProps) {
  const mapRef = useRef<HTMLDivElement | null>(null)

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
        // @ts-ignore
        const { AdvancedMarkerElement } = await google.maps.importLibrary("marker")

        if (!mapRef.current) return

        // Criar o mapa centrado na origem
        const map = new Map(mapRef.current, {
          zoom: 12,
          center: origemCoords,
          mapId: "DEMO_MAP_ID", // Substitua com seu Map ID, se necessário
        })

        // Criar marcador para a origem
        new AdvancedMarkerElement({
          map,
          position: origemCoords,
          title: "Origem",
        })

        // Criar marcador para o destino
        new AdvancedMarkerElement({
          map,
          position: destinoCoords,
          title: "Destino",
        })
      } catch (error) {
        console.error("Erro ao inicializar o mapa:", error)
      }
    }

    initializeMap()
  }, [origemCoords, destinoCoords])

  return <div ref={mapRef} style={containerStyle}></div>
}
