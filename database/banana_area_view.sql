CREATE OR REPLACE VIEW banana_systems AS 
	 SELECT a.area_name, a.country, a.the_geom, v.*
	FROM banana_areas a JOIN banana_area_variables v ON a.area_id::double precision = v.area_id;

ALTER TABLE banana_systems
  OWNER TO postgres;