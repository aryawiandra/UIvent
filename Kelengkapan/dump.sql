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
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


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
-- Name: bookmarks; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.bookmarks (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    event_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.bookmarks OWNER TO neondb_owner;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.categories (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.categories OWNER TO neondb_owner;

--
-- Name: events; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.events (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    image_url text,
    image_pid text,
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
-- Data for Name: bookmarks; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.bookmarks (id, user_id, event_id, created_at) FROM stdin;
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.categories (id, name) FROM stdin;
896bd5f2-6a16-4965-b5f2-1cde31509f49	Competition
b0f9b36b-0bbc-40c2-a7c1-dab50befef5b	Academics
c2b088be-2c7f-4a76-9ce6-9f9055fbae26	Sports
9e16da27-afe0-4c51-b28e-4ea60255def4	Arts
a63fb010-9e4d-48dd-8230-2e5e39b3f436	Concerts
2ac657d7-6e4d-4f6c-a2e6-51f97c3e6398	Others
\.


--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.events (id, title, description, venue, time_start, time_end, status, category_id, organizer_id, created_at) FROM stdin;
57e66d89-5dca-4f51-bfcc-17e5132b03dd	Arak-Arakan PSB Ganjil	Kegiatan arak-arakan sarjana baru Departemen Teknik Elektro tahun 2025	Balairung	2025-12-06 10:00:00+00	2025-12-06 16:00:00+00	perencanaan	2ac657d7-6e4d-4f6c-a2e6-51f97c3e6398	c44e0ca8-2489-4489-b2f8-f399f71ad259	2025-05-12 17:58:14.764606+00
bfb6decd-f461-46f5-b777-282b26f91ae3	The 48th Jazz Goes To Campus	Indonesia's most iconic jazz festival!	FEB UI	2024-03-21 10:00:00+00	2024-04-21 01:00:00+00	berjalan	a63fb010-9e4d-48dd-8230-2e5e39b3f436	ca097e02-014e-4caa-b769-e27444d5a91f	2025-05-14 16:28:22.15719+00
5c3d237a-d3da-41eb-b587-0f950f23eac7	Pesta Rakyat FTUI	Pembukaan Teknik Cup 2025	Rotunda FTUI	2025-04-17 08:00:00+00	2025-04-17 14:30:00+00	selesai	2ac657d7-6e4d-4f6c-a2e6-51f97c3e6398	1ff94112-1c3c-4d1b-a09c-4ea8d835b5a1	2025-05-18 04:24:44.163718+00
36059cc9-b283-4867-a711-ddd7ea1cbe62	Sociotalk Kastrat X Pengmas	Lomba Poster / Infografis dari Kastrat X Pengmas IME FTUI 2025	Online	2025-05-12 17:00:00+00	2025-05-24 16:59:00+00	berjalan	896bd5f2-6a16-4965-b5f2-1cde31509f49	c44e0ca8-2489-4489-b2f8-f399f71ad259	2025-05-18 04:24:44.163718+00
ab735f5d-4bd1-49c6-809b-03f1d192302b	Sharing Session	Sharing dari para alumni Teknik Elektro UI dengan tema “From Passion to Profession: Exploring Career Paths Aligned with Your Interests”	Gedung S.205	2025-05-16 09:00:00+00	2025-05-16 11:00:00+00	berjalan	2ac657d7-6e4d-4f6c-a2e6-51f97c3e6398	c44e0ca8-2489-4489-b2f8-f399f71ad259	2025-05-18 04:24:44.163718+00
f70ba454-5cfe-4b09-97e6-a6a0edbda5c2	Fun Games Minsoc With Alumni	Fun games mini soccer dengan alumni Departemen Teknik Elektro	T Arena	2025-05-16 23:00:00+00	2025-05-17 01:00:00+00	selesai	c2b088be-2c7f-4a76-9ce6-9f9055fbae26	c44e0ca8-2489-4489-b2f8-f399f71ad259	2025-05-18 04:24:44.163718+00
743c8eb4-a361-49cd-8854-8bdfa1a68c9d	UI Art X	Festival seni tahunan UI	Balairung	2025-06-10 03:00:00+00	2025-06-10 11:00:00+00	perencanaan	9e16da27-afe0-4c51-b28e-4ea60255def4	b1b1b1b1-b1b1-b1b1-b1b1-b1b1b1b1b1b1	2025-05-18 04:24:44.163718+00
874fb7f8-13c9-4e9d-bd43-be882fa8f4fa	UI Art War	Kompetisi seni antar fakultas	Balairung	2025-07-01 02:00:00+00	2025-07-01 10:00:00+00	perencanaan	9e16da27-afe0-4c51-b28e-4ea60255def4	b1b1b1b1-b1b1-b1b1-b1b1-b1b1b1b1b1b1	2025-05-18 04:24:44.163718+00
0b57b8ad-8e45-41ba-b6fb-e6ae28863d99	Exertion	Kompetisi olahraga antar mahasiswa	Lapangan FTUI	2025-06-15 01:00:00+00	2025-06-15 10:00:00+00	perencanaan	896bd5f2-6a16-4965-b5f2-1cde31509f49	b2b2b2b2-b2b2-b2b2-b2b2-b2b2b2b2b2b2	2025-05-18 04:24:44.163718+00
a452f9f6-c481-4b2c-acc3-00ad0d202ae8	Jamming Budaya	Pentas seni budaya	Auditorium FIB UI	2025-06-20 06:00:00+00	2025-06-20 13:00:00+00	perencanaan	9e16da27-afe0-4c51-b28e-4ea60255def4	b3b3b3b3-b3b3-b3b3-b3b3-b3b3b3b3b3b3	2025-05-18 04:24:44.163718+00
422f0e20-887e-4ab6-84c2-2d84a0990fb2	Advertising Week Festival	Festival periklanan dan pemasaran	Auditorium FISIP UI	2025-06-25 02:00:00+00	2025-06-25 10:00:00+00	perencanaan	2ac657d7-6e4d-4f6c-a2e6-51f97c3e6398	b4b4b4b4-b4b4-b4b4-b4b4-b4b4b4b4b4b4	2025-05-18 04:24:44.163718+00
42b1eeba-5a2e-4810-91ad-d913fe763d77	Aiseries	Kompetisi AI tingkat nasional	Online	2025-07-09 17:00:00+00	2025-07-20 16:59:00+00	perencanaan	896bd5f2-6a16-4965-b5f2-1cde31509f49	b5b5b5b5-b5b5-b5b5-b5b5-b5b5b5b5b5b5	2025-05-18 04:24:44.163718+00
895fe42d-6769-470e-a3a8-ae7aa139adf1	Techtonic 2.0	Kompetisi teknologi dan inovasi	Gedung Teknik UI	2025-08-01 02:00:00+00	2025-08-01 11:00:00+00	perencanaan	896bd5f2-6a16-4965-b5f2-1cde31509f49	b6b6b6b6-b6b6-b6b6-b6b6-b6b6b6b6b6b6	2025-05-18 04:24:44.163718+00
\.


--
-- Data for Name: organizations; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.organizations (id, name) FROM stdin;
c44e0ca8-2489-4489-b2f8-f399f71ad259	IME FTUI
1ff94112-1c3c-4d1b-a09c-4ea8d835b5a1	BEM Fakultas Teknik UI
ca097e02-014e-4caa-b769-e27444d5a91f	JGTC Festival
b1b1b1b1-b1b1-b1b1-b1b1-b1b1b1b1b1b1	BEM UI
b2b2b2b2-b2b2-b2b2-b2b2-b2b2b2b2b2b2	Exercise FTUI
b3b3b3b3-b3b3-b3b3-b3b3-b3b3b3b3b3b3	BEM FIB UI
b4b4b4b4-b4b4-b4b4-b4b4-b4b4b4b4b4b4	Imperative UI
b5b5b5b5-b5b5-b5b5-b5b5-b5b5b5b5b5b5	AIChE UI SC
b6b6b6b6-b6b6-b6b6-b6b6-b6b6b6b6b6b6	IEEE SB UI
7def9c3b-cd1f-4b2e-973e-91f962e0b59e	BEM UI
50366b5d-8506-44b1-9de2-578f61281810	Exercise FTUI
e628802c-8d0b-4759-87b0-955fed33641c	BEM FIB UI
88d4953e-9636-4156-aedf-5b42b273c5ce	Imperative UI
632608ec-7b96-4c33-90ce-cdf6467ca664	AIChE UI SC
253b6a2b-e16a-4d4c-8694-3653a0d82aa1	IEEE SB UI
\.


--
-- Data for Name: participants; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.participants (id, user_id, event_id, registered_at, rating) FROM stdin;
82c27a21-b204-4cad-a017-a063df7b2f20	0997e05f-69a0-4e3f-85b1-3f8a295441d3	57e66d89-5dca-4f51-bfcc-17e5132b03dd	2025-05-14 16:07:52.370837+00	5
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.users (id, name, email, password, role, organization, created_at) FROM stdin;
492920da-588b-4f0c-b959-be128ed5f14c	Admin Rutom	rutomadmin@mail.co	$2b$12$MTdXyklHyE9TLj9CCqhqfeXquxw7TckZc9U46tE/LORAyb.YaGBSO	admin	\N	2025-05-14 09:33:36.372118+00
7c706364-912e-4357-9466-0f7340fd7b61	Rutom	rutom@mail.co	$2b$12$.bl.KwyzNyr7H3zC7CqTSe96veWceVCAmhUXyOPD9wWiV.bgQ4gqu	org	c44e0ca8-2489-4489-b2f8-f399f71ad259	2025-05-16 11:06:17.268262+00
0997e05f-69a0-4e3f-85b1-3f8a295441d3	Satrio Wibowo	riyan@mail.co	$2b$12$bFa9dAy/Uj4yQ/QEkiOaKeowkunNfLTy.6ogy0oyaJEbK7THZqrSa	org	1ff94112-1c3c-4d1b-a09c-4ea8d835b5a1	2025-05-11 16:05:18.432065+00
11b49791-f7d3-4c43-8f42-481c9b97518a	a	a@a.com	$2b$12$56sk3/oW0bJm4ajjzzxdNOSEZquTG3o9O/EG1.zBaypXpGJ1l2dSO	public	\N	2025-05-17 19:16:47.769773+00
\.


--
-- Name: bookmarks bookmarks_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.bookmarks
    ADD CONSTRAINT bookmarks_pkey PRIMARY KEY (id);


--
-- Name: bookmarks bookmarks_user_id_event_id_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.bookmarks
    ADD CONSTRAINT bookmarks_user_id_event_id_key UNIQUE (user_id, event_id);


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
-- Name: bookmarks bookmarks_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.bookmarks
    ADD CONSTRAINT bookmarks_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.events(id) ON DELETE CASCADE;


--
-- Name: bookmarks bookmarks_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.bookmarks
    ADD CONSTRAINT bookmarks_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


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

