package main

import (
	"github.com/fgtago/fgweb"
	"github.com/fgtago/fgweb/appsmodel"
	"github.com/fgtago/fgweb/defaulthandlers"
	"github.com/go-chi/chi/v5"
	"github.com/transfashion/gowebeag/apis"
	"github.com/transfashion/gowebeag/handlers"
)

func Router(mux *chi.Mux) error {

	// Default handler
	fgweb.Get(mux, "/favicon.ico", defaulthandlers.FaviconHandler)
	fgweb.Get(mux, "/asset/*", defaulthandlers.AssetHandler)
	fgweb.Get(mux, "/template/*", defaulthandlers.TemplateHandler)

	hnd := handlers.New(appsmodel.GetWebservice())
	fgweb.Get(mux, "/manifest.json", hnd.Manifest)
	fgweb.Get(mux, "/", hnd.Home)

	fgweb.Get(mux, "/catalog/{brand}/{gender}/{category}", hnd.Catalog)
	fgweb.Get(mux, "/catalog/{brand}/{gender}", hnd.Catalog)
	fgweb.Get(mux, "/catalog/{brand}", hnd.Catalog)
	//fgweb.Get(mux, "/catalog", hnd.Catalog)

	api := apis.New(appsmodel.GetWebservice())
	fgweb.Post(mux, "/api/promoter", api.Promoter)
	fgweb.Post(mux, "/api/search", api.Search)

	return nil
}
