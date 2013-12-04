
  CREATE SEQUENCE banana_area_variables_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;
ALTER TABLE banana_area_variables_seq
  OWNER TO postgres;
  
 CREATE TABLE  banana_area_variables 
 (
  id integer DEFAULT nextval('banana_area_variables_seq'), 
  area_id double precision,
  cultivar_name character varying(50) DEFAULT '-'::character varying,
  area_product character varying(50) DEFAULT '-'::character varying,
  yield character varying(50) DEFAULT '-'::character varying,
  yield_tendency5 integer DEFAULT -9999,
  production_tendency5 integer DEFAULT -9999,
  density character varying(50) DEFAULT '-'::character varying,
  other_cult character varying(50) DEFAULT '-'::character varying,
  cultivar_type integer DEFAULT -9999,
  association integer DEFAULT -9999,
  use integer DEFAULT -9999,
  inputs integer DEFAULT -9999,
  irrigation integer DEFAULT -9999,
  herbicides integer DEFAULT -9999,
  fungicides integer DEFAULT -9999,
  nematicides integer DEFAULT -9999,
  insecticides integer DEFAULT -9999,
  p_goodeyi integer DEFAULT -9999,
number_hh character varying(50)  DEFAULT '-'::character varying,
chem_fert  character varying(50)  DEFAULT '-'::character varying,
org_fert   character varying(50)  DEFAULT '-'::character varying,
p_coffea  integer DEFAULT -9999,
r_similis  integer DEFAULT -9999,
meloidogyne  integer DEFAULT -9999,
h_multici  integer DEFAULT -9999,
moko_bugtok  integer DEFAULT -9999,
bxw  integer DEFAULT -9999,
blood_disease  integer DEFAULT -9999,
erwinia  integer DEFAULT -9999,
other_wilts   character varying(50)  DEFAULT '-'::character varying,
weevils  integer DEFAULT -9999,
black_streak  integer DEFAULT -9999,
yel_sigatoka  integer DEFAULT -9999,
other_streaks character varying(50)  DEFAULT '-'::character varying,
fus_race1   integer DEFAULT -9999,
fus_race2  integer DEFAULT -9999,
fus_race4  integer DEFAULT -9999,
bbtv  integer DEFAULT -9999,
bsv  integer DEFAULT -9999,
other_virus character varying(50) DEFAULT '-'::character varying
  )
WITH (
  OIDS=TRUE
);
  
  ALTER TABLE banana_area_variables
  OWNER TO postgres;
  
ALTER TABLE banana_area_variables
  ADD CONSTRAINT banana_area_un_cs UNIQUE(area_id , association , cultivar_type );
  