--
-- PostgreSQL database dump
--

-- Dumped from database version 8.4.9
-- Dumped by pg_dump version 9.1.2
-- Started on 2012-10-10 11:36:48

SET statement_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = off;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET escape_string_warning = off;

SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 153 (class 1259 OID 65850)
-- Dependencies: 6
-- Name: banana_lookup; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE banana_lookup (
    id integer NOT NULL,
    varname character varying(255),
    "group" character varying(255),
    type character varying(255),
    label character varying(255),
    value integer
);


ALTER TABLE public.banana_lookup OWNER TO postgres;

--
-- TOC entry 2683 (class 0 OID 65850)
-- Dependencies: 153
-- Data for Name: banana_lookup; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (6, 'cultivar_type', 'production system', 'integer', '6 AAB dessert type', 6);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (10, 'association', 'production system', 'integer', 'Annual food crop association intercropped with Musa (2-5 years)', 3);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (1, 'cultivar_type', 'production system', 'integer', 'Cavendish', 1);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (2, 'cultivar_type', 'production system', 'integer', 'Plantain', 2);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (3, 'cultivar_type', 'production system', 'integer', 'East African Highland', 3);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (4, 'cultivar_type', 'production system', 'integer', 'Gros Michel', 4);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (5, 'cultivar_type', 'production system', 'integer', 'Sabah types (bluggoe types, pisang awak, yangambi)', 5);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (7, 'cultivar_type', 'production system', 'integer', 'Diploid type', 7);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (8, 'association', 'production system', 'integer', 'Associated with established perennial crops', 1);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (9, 'association', 'production system', 'integer', 'Perennial Musa planting mixed with annual crops', 2);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (11, 'association', 'production system', 'integer', 'Musa field (2-5 years) with short term annual crop intercropped during Musa establishment', 4);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (12, 'association', 'production system', 'integer', 'Perennial Musa monocrop', 5);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (13, 'association', 'production system', 'integer', 'Frequently replanted Musa monocrop', 6);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (17, 'use', 'production system', 'integer', '>80% home consumption', 1);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (18, 'use', 'production system', 'integer', 'home consumption and market', 2);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (19, 'use', 'production system', 'integer', '>80% market ', 3);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (21, 'inputs', 'production technology', 'integer', 'none or very occasional use', 1);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (22, 'inputs', 'production technology', 'integer', 'regular use of low levels of fertilizer, pesticides or irrigation', 2);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (23, 'inputs', 'production technology', 'integer', 'regular use of moderate levels of fertilizer, pesticides or irrigation', 3);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (24, 'inputs', 'production technology', 'integer', 'regular use of high levels of fertilizer, pesticides or irrigation', 4);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (25, 'inputs', 'production technology', 'integer', 'certified organic production', 5);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (26, 'irrigation', 'Production Technology', 'integer', 'none', 0);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (27, 'irrigation', 'Production Technology', 'integer', 'occasional irrigation to maintain minimal plant growth in periods of deficit', 1);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (28, 'irrigation', 'Production Technology', 'integer', 'regular irrigation, although periods of water deficit several times per year', 2);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (29, 'irrigation', 'Production Technology', 'integer', 'due to water deficits irrigation to eliminate any stress ', 3);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (32, 'herbicides', 'Production Technology', 'integer', 'none', 0);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (33, 'herbicides', 'Production Technology', 'integer', '1 time a year', 1);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (34, 'herbicides', 'Production Technology', 'integer', '2-3 times/year', 2);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (36, 'fungicides', 'Production Technology', 'integer', 'none', 0);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (35, 'herbicides', 'Production Technology', 'integer', '>3 times/year', 3);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (37, 'fungicides', 'Production Technology', 'integer', '1 time a year', 1);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (38, 'fungicides', 'Production Technology', 'integer', '2-3 times/year', 2);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (39, 'fungicides', 'Production Technology', 'integer', '>3 times/year', 3);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (40, 'nematicides', 'Production Technology', 'integer', 'none', 0);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (41, 'nematicides', 'Production Technology', 'integer', '1 time a year', 1);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (42, 'nematicides', 'Production Technology', 'integer', '2-3 times/year', 2);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (43, 'nematicides', 'Production Technology', 'integer', '>3 times/year', 3);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (44, 'insecticides', 'Production Technology', 'integer', 'none', 0);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (45, 'insecticides', 'Production Technology', 'integer', '1 time a year', 1);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (46, 'insecticides', 'Production Technology', 'integer', '2-3 times/year', 2);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (47, 'insecticides', 'Production Technology', 'integer', '>3 times/year', 3);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (48, 'p_goodeyi', 'pests and diseases - nematodes', 'integer', 'not present', 0);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (49, 'p_goodeyi', 'pests and diseases - nematodes', 'integer', 'present, but very little impact on yields (<5%)', 1);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (50, 'p_goodeyi', 'pests and diseases - nematodes', 'integer', 'limited impact on yields or plantation life (5-10%)', 2);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (51, 'p_goodeyi', 'pests and diseases - nematodes', 'integer', 'moderate impact on yields or plantation life 10-25%)', 3);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (52, 'p_goodeyi', 'pests and diseases - nematodes', 'integer', 'severe impact on yields or plantation life (>25%)', 4);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (53, 'p_coffea', 'pests and diseases - nematodes', 'integer', 'not present', 0);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (54, 'p_coffea', 'pests and diseases - nematodes', 'integer', 'present, but very little impact on yields (<5%)', 1);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (55, 'p_coffea', 'pests and diseases - nematodes', 'integer', 'limited impact on yields or plantation life (5-10%)', 2);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (56, 'p_coffea', 'pests and diseases - nematodes', 'integer', 'moderate impact on yields or plantation life 10-25%)', 3);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (57, 'p_coffea', 'pests and diseases - nematodes', 'integer', 'severe impact on yields or plantation life (>25%)', 4);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (58, 'r_similis', 'pests and diseases - nematodes', 'integer', 'not present', 0);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (59, 'r_similis', 'pests and diseases - nematodes', 'integer', 'present, but very little impact on yields (<5%)', 1);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (60, 'r_similis', 'pests and diseases - nematodes', 'integer', 'limited impact on yields or plantation life (5-10%)', 2);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (61, 'r_similis', 'pests and diseases - nematodes', 'integer', 'moderate impact on yields or plantation life 10-25%)', 3);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (62, 'r_similis', 'pests and diseases - nematodes', 'integer', 'severe impact on yields or plantation life (>25%)', 4);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (63, 'meloidogyne', 'pests and diseases - nematodes', 'integer', 'not present', 0);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (64, 'meloidogyne', 'pests and diseases - nematodes', 'integer', 'present, but very little impact on yields (<5%)', 1);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (65, 'meloidogyne', 'pests and diseases - nematodes', 'integer', 'limited impact on yields or plantation life (5-10%)', 2);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (66, 'meloidogyne', 'pests and diseases - nematodes', 'integer', 'moderate impact on yields or plantation life 10-25%)', 3);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (67, 'meloidogyne', 'pests and diseases - nematodes', 'integer', 'severe impact on yields or plantation life (>25%)', 4);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (68, 'h_multici', 'pests and diseases - nematodes', 'integer', 'not present', 0);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (69, 'h_multici', 'pests and diseases - nematodes', 'integer', 'present, but very little impact on yields (<5%)', 1);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (70, 'h_multici', 'pests and diseases - nematodes', 'integer', 'limited impact on yields or plantation life (5-10%)', 2);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (71, 'h_multici', 'pests and diseases - nematodes', 'integer', 'moderate impact on yields or plantation life 10-25%)', 3);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (72, 'h_multici', 'pests and diseases - nematodes', 'integer', 'severe impact on yields or plantation life (>25%)', 4);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (73, 'moko_bugtok', 'pests and diseases - bacterial wilts', 'integer', 'not present', 0);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (74, 'moko_bugtok', 'pests and diseases - bacterial wilts', 'integer', 'present, but very little impact on yields (<5%)', 1);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (75, 'moko_bugtok', 'pests and diseases - bacterial wilts', 'integer', 'limited impact on yields or plantation life (5-10%)', 2);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (76, 'moko_bugtok', 'pests and diseases - bacterial wilts', 'integer', 'moderate impact on yields or plantation life 10-25%)', 3);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (77, 'moko_bugtok', 'pests and diseases - bacterial wilts', 'integer', 'severe impact on yields or plantation life (>25%)', 4);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (78, 'bxw', 'pests and diseases - bacterial wilts', 'integer', 'not present', 0);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (79, 'bxw', 'pests and diseases - bacterial wilts', 'integer', 'present, but very little impact on yields (<5%)', 1);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (80, 'bxw', 'pests and diseases - bacterial wilts', 'integer', 'limited impact on yields or plantation life (5-10%)', 2);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (81, 'bxw', 'pests and diseases - bacterial wilts', 'integer', 'moderate impact on yields or plantation life 10-25%)', 3);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (82, 'bxw', 'pests and diseases - bacterial wilts', 'integer', 'severe impact on yields or plantation life (>25%)', 4);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (83, 'blood_disease', 'pests and diseases - bacterial wilts', 'integer', 'not present', 0);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (84, 'blood_disease', 'pests and diseases - bacterial wilts', 'integer', 'present, but very little impact on yields (<5%)', 1);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (85, 'blood_disease', 'pests and diseases - bacterial wilts', 'integer', 'limited impact on yields or plantation life (5-10%)', 2);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (86, 'blood_disease', 'pests and diseases - bacterial wilts', 'integer', 'moderate impact on yields or plantation life 10-25%)', 3);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (87, 'blood_disease', 'pests and diseases - bacterial wilts', 'integer', 'severe impact on yields or plantation life (>25%)', 4);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (88, 'erwinia', 'pests and diseases - bacterial wilts', 'integer', 'not present', 0);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (89, 'erwinia', 'pests and diseases - bacterial wilts', 'integer', 'present, but very little impact on yields (<5%)', 1);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (90, 'erwinia', 'pests and diseases - bacterial wilts', 'integer', 'limited impact on yields or plantation life (5-10%)', 2);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (91, 'erwinia', 'pests and diseases - bacterial wilts', 'integer', 'moderate impact on yields or plantation life 10-25%)', 3);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (92, 'erwinia', 'pests and diseases - bacterial wilts', 'integer', 'severe impact on yields or plantation life (>25%)', 4);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (93, 'weevils', 'pests and diseases - insect pests', 'integer', 'not present', 0);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (94, 'weevils', 'pests and diseases - insect pests', 'integer', 'present, but very little impact on yields (<5%)', 1);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (95, 'weevils', 'pests and diseases - insect pests', 'integer', 'limited impact on yields or plantation life (5-10%)', 2);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (96, 'weevils', 'pests and diseases - insect pests', 'integer', 'moderate impact on yields or plantation life 10-25%)', 3);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (97, 'weevils', 'pests and diseases - insect pests', 'integer', 'severe impact on yields or plantation life (>25%)', 4);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (98, 'black_streak', 'pests and diseases - leaf streaks', 'integer', 'not present', 0);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (99, 'black_streak', 'pests and diseases - leaf streaks', 'integer', 'present, but very little impact on yields (<5%)', 1);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (100, 'black_streak', 'pests and diseases - leaf streaks', 'integer', 'limited impact on yields or plantation life (5-10%)', 2);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (101, 'black_streak', 'pests and diseases - leaf streaks', 'integer', 'moderate impact on yields or plantation life 10-25%)', 3);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (102, 'black_streak', 'pests and diseases - leaf streaks', 'integer', 'severe impact on yields or plantation life (>25%)', 4);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (103, 'yel_sigatoka', 'pests and diseases - leaf streaks', 'integer', 'not present', 0);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (104, 'yel_sigatoka', 'pests and diseases - leaf streaks', 'integer', 'present, but very little impact on yields (<5%)', 1);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (105, 'yel_sigatoka', 'pests and diseases - leaf streaks', 'integer', 'limited impact on yields or plantation life (5-10%)', 2);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (106, 'yel_sigatoka', 'pests and diseases - leaf streaks', 'integer', 'moderate impact on yields or plantation life 10-25%)', 3);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (107, 'yel_sigatoka', 'pests and diseases - leaf streaks', 'integer', 'severe impact on yields or plantation life (>25%)', 4);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (108, 'fus_race1', 'pests and diseases - fungal wilts', 'integer', 'not present', 0);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (109, 'fus_race1', 'pests and diseases - fungal wilts', 'integer', 'present, but very little impact on yields (<5%)', 1);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (110, 'fus_race1', 'pests and diseases - fungal wilts', 'integer', 'limited impact on yields or plantation life (5-10%)', 2);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (111, 'fus_race1', 'pests and diseases - fungal wilts', 'integer', 'moderate impact on yields or plantation life 10-25%)', 3);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (112, 'fus_race1', 'pests and diseases - fungal wilts', 'integer', 'severe impact on yields or plantation life (>25%)', 4);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (113, 'fus_race2', 'pests and diseases - fungal wilts', 'integer', 'not present', 0);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (114, 'fus_race2', 'pests and diseases - fungal wilts', 'integer', 'present, but very little impact on yields (<5%)', 1);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (115, 'fus_race2', 'pests and diseases - fungal wilts', 'integer', 'limited impact on yields or plantation life (5-10%)', 2);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (116, 'fus_race2', 'pests and diseases - fungal wilts', 'integer', 'moderate impact on yields or plantation life 10-25%)', 3);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (117, 'fus_race2', 'pests and diseases - fungal wilts', 'integer', 'severe impact on yields or plantation life (>25%)', 4);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (118, 'fus_race4', 'pests and diseases - fungal wilts', 'integer', 'not present', 0);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (119, 'fus_race4', 'pests and diseases - fungal wilts', 'integer', 'present, but very little impact on yields (<5%)', 1);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (120, 'fus_race4', 'pests and diseases - fungal wilts', 'integer', 'limited impact on yields or plantation life (5-10%)', 2);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (121, 'fus_race4', 'pests and diseases - fungal wilts', 'integer', 'moderate impact on yields or plantation life 10-25%)', 3);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (122, 'fus_race4', 'pests and diseases - fungal wilts', 'integer', 'severe impact on yields or plantation life (>25%)', 4);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (123, 'bbtv', 'pests and diseases- virus', 'integer', 'not present', 0);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (124, 'bbtv', 'pests and diseases- virus', 'integer', 'present, but very little impact on yields (<5%)', 1);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (125, 'bbtv', 'pests and diseases- virus', 'integer', 'limited impact on yields or plantation life (5-10%)', 2);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (126, 'bbtv', 'pests and diseases- virus', 'integer', 'moderate impact on yields or plantation life 10-25%)', 3);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (127, 'bbtv', 'pests and diseases- virus', 'integer', 'severe impact on yields or plantation life (>25%)', 4);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (128, 'bsv', 'pests and diseases- virus', 'integer', 'not present', 0);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (129, 'bsv', 'pests and diseases- virus', 'integer', 'present, but very little impact on yields (<5%)', 1);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (130, 'bsv', 'pests and diseases- virus', 'integer', 'limited impact on yields or plantation life (5-10%)', 2);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (131, 'bsv', 'pests and diseases- virus', 'integer', 'moderate impact on yields or plantation life 10-25%)', 3);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (132, 'bsv', 'pests and diseases- virus', 'integer', 'severe impact on yields or plantation life (>25%)', 4);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (133, 'yield_tendency5', 'tendency in yield in past 5 years', 'integer', 'decline', -1);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (134, 'yield_tendency5', 'tendency in yield in past 5 years', 'integer', 'stable', 0);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (135, 'yield_tendency5', 'tendency in yield in past 5 years', 'integer', 'increasing', +1);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (136, 'production_tendency5', 'tendency in production in past 5 years', 'integer', 'decline', -1);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (137, 'production_tendency5', 'tendency in production in past 5 years', 'integer', 'stable', 0);
INSERT INTO banana_lookup (id, varname, "group", type, label, value) VALUES (138, 'production_tendency5', 'tendency in production in past 5 years', 'integer', 'increasing', +1);

--
-- TOC entry 2682 (class 2606 OID 65857)
-- Dependencies: 153 153
-- Name: primid_lookup; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY banana_lookup
    ADD CONSTRAINT primid_lookup PRIMARY KEY (id);


-- Completed on 2012-10-10 11:36:49

--
-- PostgreSQL database dump complete
--

