/*
  Extend Leaflet's TileLayer, which has a fixed template URL string,
  to accept a user-defined function `urlFun` instead, which takes an
  object as input and must return a ready-to-use URL string.
  
  Example of use: ./tilelayer_urlfun.html - A map is defined only in
  certain parts of the world. Where the map is defined, `urlFun`
  returns an URL.  Where the map is not defined, `urlFun` returns an
  empty string.
  
  (c) 2015 Alpstein Tourismus GmbH & CO KG

  http://www.outdooractive.com
  guillaume.lathoud@outdooractive.com
*/

/*global L*/

(function () {

    var TL = L.TileLayer;

    L.TileLayerUrlFun = TL.extend({
        
        initialize : function ( /*function: <cfg object> => <string>*/urlFun, /*?object?*/options )
        {
            this._oaUrlFun  = urlFun;
            this._oaOptions = options;

            TL.prototype.initialize.call( this, null, options );
        }
        
        , getTileUrl : function ( coords )
        {
            var cfg = _oaGetUrlCfg.call( this, coords, this._oaOptions );
            return this._oaUrlFun( cfg );
        }
        
    });

    L.tileLayerUrlFun = function ( urlFun, options ) {
        return new L.TileLayerUrlFun( urlFun, options );
    };

    // --- Details

    var _UNDERLAYER = '_UL', _SEP = '\x1F';
    function _oaGetUrlCfg( coords, options )
    {
        // Include the logic of the `TileLayer.getTileUrl`
        // implementation without copying the code.
        
        var _underLayer = this[ _UNDERLAYER ]  ||  (
            this[ _UNDERLAYER ] = 
                L.tileLayer( [ '{s}', '{x}', '{y}', '{z}' ].join( _SEP )
                             , options 
                           )
        )
        
        ,   arr = _underLayer.getTileUrl( coords ).split( _SEP )
        ,     i = 0
        ,   ret = { s : arr[ i++ ], x : +arr[ i++ ], y : +arr[ i++ ], z : +arr[ i++ ] }
        ;
        
        // Copy the remaining information (e.g. `id` in the
        // `main` example).
        for (var k in options) { if (!(k in ret)) {
            ret[ k ] = options[ k ];
        }}
        
        return ret;
    }

})();
