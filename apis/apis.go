package apis

import "github.com/fgtago/fgweb/appsmodel"

type Api struct {
	Webservice *appsmodel.Webservice
}

var api *Api

func New(ws *appsmodel.Webservice) *Api {
	api = &Api{
		Webservice: ws,
	}
	return api
}
