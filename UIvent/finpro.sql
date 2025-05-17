--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: event_status; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public.event_status AS ENUM (
    'perencanaan',
    'berjalan',
    'selesai'
);


ALTER TYPE public.event_status OWNER TO neondb_owner;

--
-- Name: user_role; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public.user_role AS ENUM (
    'public',
    'org',
    'admin'
);


ALTER TYPE public.user_role OWNER TO neondb_owner;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.categories (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.categories OWNER TO neondb_owner;

--
-- Name: events; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.events (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    venue character varying(255),
    time_start timestamp with time zone NOT NULL,
    time_end timestamp with time zone NOT NULL,
    status public.event_status NOT NULL,
    category_id uuid,
    organizer_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.events OWNER TO neondb_owner;

--
-- Name: organizations; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.organizations (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.organizations OWNER TO neondb_owner;

--
-- Name: participants; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.participants (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    event_id uuid NOT NULL,
    registered_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    rating integer,
    CONSTRAINT participants_rating_check CHECK (((rating >= 1) AND (rating <= 5)))
);


ALTER TABLE public.participants OWNER TO neondb_owner;

--
-- Name: statistics; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.statistics (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    event_id uuid NOT NULL,
    year integer NOT NULL,
    participants integer NOT NULL,
    avg_rating double precision,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT statistics_avg_rating_check CHECK (((avg_rating >= (0)::double precision) AND (avg_rating <= (5)::double precision))),
    CONSTRAINT statistics_participants_check CHECK ((participants >= 0)),
    CONSTRAINT statistics_year_check CHECK ((year > 2000))
);


ALTER TABLE public.statistics OWNER TO neondb_owner;

--
-- Name: users; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password text NOT NULL,
    role public.user_role DEFAULT 'public'::public.user_role NOT NULL,
    organization uuid,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.users OWNER TO neondb_owner;

--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.categories (id, name, created_at) FROM stdin;
3d274d13-2219-4ebc-8966-ec796559f6c9	Olahraga	2025-05-12 16:52:43.20008+00
\.


--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.events (id, title, description, venue, time_start, time_end, status, category_id, organizer_id, created_at) FROM stdin;
57e66d89-5dca-4f51-bfcc-17e5132b03dd	Arak-Arakan PSB Ganjil	alumni	univ indo	2025-12-06 10:00:00+00	2025-12-06 16:00:00+00	perencanaan	3d274d13-2219-4ebc-8966-ec796559f6c9	0997e05f-69a0-4e3f-85b1-3f8a295441d3	2025-05-12 17:58:14.764606+00
bfb6decd-f461-46f5-b777-282b26f91ae3	Arak-Arakan PSB Ganjil	komin nekro	univ indo	2025-12-06 10:00:00+00	2025-12-06 16:00:00+00	perencanaan	3d274d13-2219-4ebc-8966-ec796559f6c9	1ff94112-1c3c-4d1b-a09c-4ea8d835b5a1	2025-05-14 16:28:22.15719+00
\.


--
-- Data for Name: organizations; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.organizations (id, name) FROM stdin;
1ff94112-1c3c-4d1b-a09c-4ea8d835b5a1	BEM FTUI
c44e0ca8-2489-4489-b2f8-f399f71ad259	IME FTUI
\.


--
-- Data for Name: participants; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.participants (id, user_id, event_id, registered_at, rating) FROM stdin;
82c27a21-b204-4cad-a017-a063df7b2f20	0997e05f-69a0-4e3f-85b1-3f8a295441d3	57e66d89-5dca-4f51-bfcc-17e5132b03dd	2025-05-14 16:07:52.370837+00	4
\.


--
-- Data for Name: statistics; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.statistics (id, event_id, year, participants, avg_rating, created_at) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.users (id, name, email, password, role, organization, created_at) FROM stdin;
492920da-588b-4f0c-b959-be128ed5f14c	Admin Rutom	rutomadmin@mail.co	$2b$12$MTdXyklHyE9TLj9CCqhqfeXquxw7TckZc9U46tE/LORAyb.YaGBSO	admin	\N	2025-05-14 09:33:36.372118+00
0997e05f-69a0-4e3f-85b1-3f8a295441d3	Muhammad Riyan	riyan@mail.co	$2b$12$wySWPS7y01NF4nr9V/owDOHwcCviG4djFSp4mCsn3LoYj0D/jCHWe	org	1ff94112-1c3c-4d1b-a09c-4ea8d835b5a1	2025-05-11 16:05:18.432065+00
\.


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);


--
-- Name: organizations organizations_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.organizations
    ADD CONSTRAINT organizations_pkey PRIMARY KEY (id);


--
-- Name: participants participants_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.participants
    ADD CONSTRAINT participants_pkey PRIMARY KEY (id);


--
-- Name: participants participants_user_id_event_id_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.participants
    ADD CONSTRAINT participants_user_id_event_id_key UNIQUE (user_id, event_id);


--
-- Name: statistics statistics_event_id_year_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.statistics
    ADD CONSTRAINT statistics_event_id_year_key UNIQUE (event_id, year);


--
-- Name: statistics statistics_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.statistics
    ADD CONSTRAINT statistics_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: events events_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id) ON DELETE SET NULL;


--
-- Name: users fk_organization; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT fk_organization FOREIGN KEY (organization) REFERENCES public.organizations(id);


--
-- Name: participants participants_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.participants
    ADD CONSTRAINT participants_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.events(id) ON DELETE CASCADE;


--
-- Name: participants participants_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.participants
    ADD CONSTRAINT participants_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: statistics statistics_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.statistics
    ADD CONSTRAINT statistics_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.events(id) ON DELETE CASCADE;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;


--
-- PostgreSQL database dump complete
--

