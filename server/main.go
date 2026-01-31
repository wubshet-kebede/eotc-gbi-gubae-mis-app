package server

import (
	"fmt"
	"net/http"
)

func main() {
    http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintln(w, "Server is healthy")
    })
    fmt.Println("Go server running on :9090")
    http.ListenAndServe(":9090", nil)
}
