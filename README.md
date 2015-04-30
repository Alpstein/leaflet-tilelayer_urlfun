Extend Leaflet's TileLayer, which has a fixed template URL string, to
accept a user-defined function `urlFun` instead, which takes an object
as input and must return a ready-to-use URL string.

Tested with Leaflet v0.7.2 as of 2015-03-03

Live example: http://alpstein.github.io/leaflet-tilelayer_urlfun/

## Related work

https://github.com/ismyrnow/Leaflet.functionaltilelayer has promise
support, but duplicates the code of the `TileLayer.getTileUrl` logic.
