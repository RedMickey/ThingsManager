toc.dat                                                                                             0000600 0004000 0002000 00000041776 13567021145 0014462 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        PGDMP           2            
    w            thingsManager    11.5    11.5 <    H           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false         I           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false         J           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                       false         K           1262    16393    thingsManager    DATABASE     �   CREATE DATABASE "thingsManager" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Russian_Russia.1251' LC_CTYPE = 'Russian_Russia.1251';
    DROP DATABASE "thingsManager";
             postgres    false         �            1259    16396    place    TABLE     �   CREATE TABLE public.place (
    description text,
    id_place integer NOT NULL,
    place_name character varying(50) NOT NULL,
    id_outer_place integer,
    id_place_type integer NOT NULL,
    id_user integer NOT NULL
);
    DROP TABLE public.place;
       public         postgres    false         �            1259    16394    Place_id_place_seq    SEQUENCE     �   CREATE SEQUENCE public."Place_id_place_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public."Place_id_place_seq";
       public       postgres    false    197         L           0    0    Place_id_place_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public."Place_id_place_seq" OWNED BY public.place.id_place;
            public       postgres    false    196         �            1259    16457    category    TABLE     v   CREATE TABLE public.category (
    id_category integer NOT NULL,
    category_name character varying(100) NOT NULL
);
    DROP TABLE public.category;
       public         postgres    false         �            1259    16455    category_id_category_seq    SEQUENCE     �   CREATE SEQUENCE public.category_id_category_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.category_id_category_seq;
       public       postgres    false    207         M           0    0    category_id_category_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.category_id_category_seq OWNED BY public.category.id_category;
            public       postgres    false    206         �            1259    16433    item    TABLE     �   CREATE TABLE public.item (
    id_item integer NOT NULL,
    item_name character varying(150) NOT NULL,
    id_category integer,
    id_place integer,
    description text,
    id_user integer NOT NULL
);
    DROP TABLE public.item;
       public         postgres    false         �            1259    16431    item_id_item_seq    SEQUENCE     �   CREATE SEQUENCE public.item_id_item_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.item_id_item_seq;
       public       postgres    false    203         N           0    0    item_id_item_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.item_id_item_seq OWNED BY public.item.id_item;
            public       postgres    false    202         �            1259    16444 
   item_image    TABLE     �   CREATE TABLE public.item_image (
    id_item_image integer NOT NULL,
    image_location character varying(150) NOT NULL,
    priority integer,
    id_item integer NOT NULL
);
    DROP TABLE public.item_image;
       public         postgres    false         �            1259    16442    item_image_id_item_image_seq    SEQUENCE     �   CREATE SEQUENCE public.item_image_id_item_image_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.item_image_id_item_image_seq;
       public       postgres    false    205         O           0    0    item_image_id_item_image_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.item_image_id_item_image_seq OWNED BY public.item_image.id_item_image;
            public       postgres    false    204         �            1259    16420    place_image    TABLE     �   CREATE TABLE public.place_image (
    id_place_image integer NOT NULL,
    image_location character varying(100) NOT NULL,
    priority integer,
    id_place integer NOT NULL
);
    DROP TABLE public.place_image;
       public         postgres    false         �            1259    16418    place_image_id_place_image_seq    SEQUENCE     �   CREATE SEQUENCE public.place_image_id_place_image_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.place_image_id_place_image_seq;
       public       postgres    false    201         P           0    0    place_image_id_place_image_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.place_image_id_place_image_seq OWNED BY public.place_image.id_place_image;
            public       postgres    false    200         �            1259    16407 
   place_type    TABLE     {   CREATE TABLE public.place_type (
    id_place_type integer NOT NULL,
    place_type_name character varying(15) NOT NULL
);
    DROP TABLE public.place_type;
       public         postgres    false         �            1259    16405    place_type_id_place_type_seq    SEQUENCE     �   CREATE SEQUENCE public.place_type_id_place_type_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.place_type_id_place_type_seq;
       public       postgres    false    199         Q           0    0    place_type_id_place_type_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.place_type_id_place_type_seq OWNED BY public.place_type.id_place_type;
            public       postgres    false    198         �            1259    16475    user    TABLE     �   CREATE TABLE public."user" (
    id_user integer NOT NULL,
    user_email character varying(80) NOT NULL,
    login character varying(50),
    name character varying(50),
    surname character varying(50),
    password character varying(200) NOT NULL
);
    DROP TABLE public."user";
       public         postgres    false         �            1259    16473    user_id_user_seq    SEQUENCE     �   CREATE SEQUENCE public.user_id_user_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.user_id_user_seq;
       public       postgres    false    209         R           0    0    user_id_user_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.user_id_user_seq OWNED BY public."user".id_user;
            public       postgres    false    208         �
           2604    16460    category id_category    DEFAULT     |   ALTER TABLE ONLY public.category ALTER COLUMN id_category SET DEFAULT nextval('public.category_id_category_seq'::regclass);
 C   ALTER TABLE public.category ALTER COLUMN id_category DROP DEFAULT;
       public       postgres    false    207    206    207         �
           2604    16436    item id_item    DEFAULT     l   ALTER TABLE ONLY public.item ALTER COLUMN id_item SET DEFAULT nextval('public.item_id_item_seq'::regclass);
 ;   ALTER TABLE public.item ALTER COLUMN id_item DROP DEFAULT;
       public       postgres    false    203    202    203         �
           2604    16447    item_image id_item_image    DEFAULT     �   ALTER TABLE ONLY public.item_image ALTER COLUMN id_item_image SET DEFAULT nextval('public.item_image_id_item_image_seq'::regclass);
 G   ALTER TABLE public.item_image ALTER COLUMN id_item_image DROP DEFAULT;
       public       postgres    false    204    205    205         �
           2604    16399    place id_place    DEFAULT     r   ALTER TABLE ONLY public.place ALTER COLUMN id_place SET DEFAULT nextval('public."Place_id_place_seq"'::regclass);
 =   ALTER TABLE public.place ALTER COLUMN id_place DROP DEFAULT;
       public       postgres    false    196    197    197         �
           2604    16423    place_image id_place_image    DEFAULT     �   ALTER TABLE ONLY public.place_image ALTER COLUMN id_place_image SET DEFAULT nextval('public.place_image_id_place_image_seq'::regclass);
 I   ALTER TABLE public.place_image ALTER COLUMN id_place_image DROP DEFAULT;
       public       postgres    false    201    200    201         �
           2604    16410    place_type id_place_type    DEFAULT     �   ALTER TABLE ONLY public.place_type ALTER COLUMN id_place_type SET DEFAULT nextval('public.place_type_id_place_type_seq'::regclass);
 G   ALTER TABLE public.place_type ALTER COLUMN id_place_type DROP DEFAULT;
       public       postgres    false    199    198    199         �
           2604    16478    user id_user    DEFAULT     n   ALTER TABLE ONLY public."user" ALTER COLUMN id_user SET DEFAULT nextval('public.user_id_user_seq'::regclass);
 =   ALTER TABLE public."user" ALTER COLUMN id_user DROP DEFAULT;
       public       postgres    false    208    209    209         C          0    16457    category 
   TABLE DATA               >   COPY public.category (id_category, category_name) FROM stdin;
    public       postgres    false    207       2883.dat ?          0    16433    item 
   TABLE DATA               _   COPY public.item (id_item, item_name, id_category, id_place, description, id_user) FROM stdin;
    public       postgres    false    203       2879.dat A          0    16444 
   item_image 
   TABLE DATA               V   COPY public.item_image (id_item_image, image_location, priority, id_item) FROM stdin;
    public       postgres    false    205       2881.dat 9          0    16396    place 
   TABLE DATA               j   COPY public.place (description, id_place, place_name, id_outer_place, id_place_type, id_user) FROM stdin;
    public       postgres    false    197       2873.dat =          0    16420    place_image 
   TABLE DATA               Y   COPY public.place_image (id_place_image, image_location, priority, id_place) FROM stdin;
    public       postgres    false    201       2877.dat ;          0    16407 
   place_type 
   TABLE DATA               D   COPY public.place_type (id_place_type, place_type_name) FROM stdin;
    public       postgres    false    199       2875.dat E          0    16475    user 
   TABLE DATA               U   COPY public."user" (id_user, user_email, login, name, surname, password) FROM stdin;
    public       postgres    false    209       2885.dat S           0    0    Place_id_place_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public."Place_id_place_seq"', 3, true);
            public       postgres    false    196         T           0    0    category_id_category_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.category_id_category_seq', 1, false);
            public       postgres    false    206         U           0    0    item_id_item_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.item_id_item_seq', 2, true);
            public       postgres    false    202         V           0    0    item_image_id_item_image_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.item_image_id_item_image_seq', 1, false);
            public       postgres    false    204         W           0    0    place_image_id_place_image_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.place_image_id_place_image_seq', 1, false);
            public       postgres    false    200         X           0    0    place_type_id_place_type_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.place_type_id_place_type_seq', 3, true);
            public       postgres    false    198         Y           0    0    user_id_user_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.user_id_user_seq', 1, true);
            public       postgres    false    208         �
           2606    16404    place Place_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.place
    ADD CONSTRAINT "Place_pkey" PRIMARY KEY (id_place);
 <   ALTER TABLE ONLY public.place DROP CONSTRAINT "Place_pkey";
       public         postgres    false    197         �
           2606    16462    category category_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (id_category);
 @   ALTER TABLE ONLY public.category DROP CONSTRAINT category_pkey;
       public         postgres    false    207         �
           2606    16449    item_image item_image_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public.item_image
    ADD CONSTRAINT item_image_pkey PRIMARY KEY (id_item_image);
 D   ALTER TABLE ONLY public.item_image DROP CONSTRAINT item_image_pkey;
       public         postgres    false    205         �
           2606    16441    item item_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.item
    ADD CONSTRAINT item_pkey PRIMARY KEY (id_item);
 8   ALTER TABLE ONLY public.item DROP CONSTRAINT item_pkey;
       public         postgres    false    203         �
           2606    16425    place_image place_image_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.place_image
    ADD CONSTRAINT place_image_pkey PRIMARY KEY (id_place_image);
 F   ALTER TABLE ONLY public.place_image DROP CONSTRAINT place_image_pkey;
       public         postgres    false    201         �
           2606    16412    place_type place_type_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public.place_type
    ADD CONSTRAINT place_type_pkey PRIMARY KEY (id_place_type);
 D   ALTER TABLE ONLY public.place_type DROP CONSTRAINT place_type_pkey;
       public         postgres    false    199         �
           2606    16480    user user_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id_user);
 :   ALTER TABLE ONLY public."user" DROP CONSTRAINT user_pkey;
       public         postgres    false    209         �
           2606    16463    item item_id_category_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.item
    ADD CONSTRAINT item_id_category_fkey FOREIGN KEY (id_category) REFERENCES public.category(id_category) NOT VALID;
 D   ALTER TABLE ONLY public.item DROP CONSTRAINT item_id_category_fkey;
       public       postgres    false    203    207    2741         �
           2606    16468    item item_id_place_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.item
    ADD CONSTRAINT item_id_place_fkey FOREIGN KEY (id_place) REFERENCES public.place(id_place) NOT VALID;
 A   ALTER TABLE ONLY public.item DROP CONSTRAINT item_id_place_fkey;
       public       postgres    false    197    203    2731         �
           2606    16481    item item_id_user_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.item
    ADD CONSTRAINT item_id_user_fkey FOREIGN KEY (id_user) REFERENCES public."user"(id_user) NOT VALID;
 @   ALTER TABLE ONLY public.item DROP CONSTRAINT item_id_user_fkey;
       public       postgres    false    2743    203    209         �
           2606    16450 "   item_image item_image_id_item_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.item_image
    ADD CONSTRAINT item_image_id_item_fkey FOREIGN KEY (id_item) REFERENCES public.item(id_item);
 L   ALTER TABLE ONLY public.item_image DROP CONSTRAINT item_image_id_item_fkey;
       public       postgres    false    205    2737    203         �
           2606    16413    place place_id_place_type_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.place
    ADD CONSTRAINT place_id_place_type_fkey FOREIGN KEY (id_place_type) REFERENCES public.place_type(id_place_type) NOT VALID;
 H   ALTER TABLE ONLY public.place DROP CONSTRAINT place_id_place_type_fkey;
       public       postgres    false    199    197    2733         �
           2606    16486    place place_id_user_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.place
    ADD CONSTRAINT place_id_user_fkey FOREIGN KEY (id_user) REFERENCES public."user"(id_user) NOT VALID;
 B   ALTER TABLE ONLY public.place DROP CONSTRAINT place_id_user_fkey;
       public       postgres    false    197    2743    209         �
           2606    16426 %   place_image place_image_id_place_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.place_image
    ADD CONSTRAINT place_image_id_place_fkey FOREIGN KEY (id_place) REFERENCES public.place(id_place);
 O   ALTER TABLE ONLY public.place_image DROP CONSTRAINT place_image_id_place_fkey;
       public       postgres    false    201    197    2731          2883.dat                                                                                            0000600 0004000 0002000 00000000005 13567021145 0014255 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           2879.dat                                                                                            0000600 0004000 0002000 00000000063 13567021145 0014266 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        2	Тетрадь	\N	3	Моя тетрадь	1
\.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                             2881.dat                                                                                            0000600 0004000 0002000 00000000005 13567021145 0014253 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           2873.dat                                                                                            0000600 0004000 0002000 00000000047 13567021145 0014262 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        Мой стол	3	Стол	\N	3	1
\.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         2877.dat                                                                                            0000600 0004000 0002000 00000000005 13567021145 0014260 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           2875.dat                                                                                            0000600 0004000 0002000 00000000072 13567021145 0014262 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1	Строения
2	Помещения
3	Место
\.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                      2885.dat                                                                                            0000600 0004000 0002000 00000000063 13567021145 0014263 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1	test@mail.ru	testLogin	myName	surname	12321
\.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                             restore.sql                                                                                         0000600 0004000 0002000 00000033772 13567021145 0015404 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        --
-- NOTE:
--
-- File paths need to be edited. Search for $$PATH$$ and
-- replace it with the path to the directory containing
-- the extracted data files.
--
--
-- PostgreSQL database dump
--

-- Dumped from database version 11.5
-- Dumped by pg_dump version 11.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE "thingsManager";
--
-- Name: thingsManager; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "thingsManager" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Russian_Russia.1251' LC_CTYPE = 'Russian_Russia.1251';


ALTER DATABASE "thingsManager" OWNER TO postgres;

\connect "thingsManager"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: place; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.place (
    description text,
    id_place integer NOT NULL,
    place_name character varying(50) NOT NULL,
    id_outer_place integer,
    id_place_type integer NOT NULL,
    id_user integer NOT NULL
);


ALTER TABLE public.place OWNER TO postgres;

--
-- Name: Place_id_place_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Place_id_place_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Place_id_place_seq" OWNER TO postgres;

--
-- Name: Place_id_place_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Place_id_place_seq" OWNED BY public.place.id_place;


--
-- Name: category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.category (
    id_category integer NOT NULL,
    category_name character varying(100) NOT NULL
);


ALTER TABLE public.category OWNER TO postgres;

--
-- Name: category_id_category_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.category_id_category_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.category_id_category_seq OWNER TO postgres;

--
-- Name: category_id_category_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.category_id_category_seq OWNED BY public.category.id_category;


--
-- Name: item; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.item (
    id_item integer NOT NULL,
    item_name character varying(150) NOT NULL,
    id_category integer,
    id_place integer,
    description text,
    id_user integer NOT NULL
);


ALTER TABLE public.item OWNER TO postgres;

--
-- Name: item_id_item_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.item_id_item_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.item_id_item_seq OWNER TO postgres;

--
-- Name: item_id_item_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.item_id_item_seq OWNED BY public.item.id_item;


--
-- Name: item_image; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.item_image (
    id_item_image integer NOT NULL,
    image_location character varying(150) NOT NULL,
    priority integer,
    id_item integer NOT NULL
);


ALTER TABLE public.item_image OWNER TO postgres;

--
-- Name: item_image_id_item_image_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.item_image_id_item_image_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.item_image_id_item_image_seq OWNER TO postgres;

--
-- Name: item_image_id_item_image_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.item_image_id_item_image_seq OWNED BY public.item_image.id_item_image;


--
-- Name: place_image; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.place_image (
    id_place_image integer NOT NULL,
    image_location character varying(100) NOT NULL,
    priority integer,
    id_place integer NOT NULL
);


ALTER TABLE public.place_image OWNER TO postgres;

--
-- Name: place_image_id_place_image_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.place_image_id_place_image_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.place_image_id_place_image_seq OWNER TO postgres;

--
-- Name: place_image_id_place_image_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.place_image_id_place_image_seq OWNED BY public.place_image.id_place_image;


--
-- Name: place_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.place_type (
    id_place_type integer NOT NULL,
    place_type_name character varying(15) NOT NULL
);


ALTER TABLE public.place_type OWNER TO postgres;

--
-- Name: place_type_id_place_type_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.place_type_id_place_type_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.place_type_id_place_type_seq OWNER TO postgres;

--
-- Name: place_type_id_place_type_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.place_type_id_place_type_seq OWNED BY public.place_type.id_place_type;


--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id_user integer NOT NULL,
    user_email character varying(80) NOT NULL,
    login character varying(50),
    name character varying(50),
    surname character varying(50),
    password character varying(200) NOT NULL
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: user_id_user_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_user_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_user_seq OWNER TO postgres;

--
-- Name: user_id_user_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_user_seq OWNED BY public."user".id_user;


--
-- Name: category id_category; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category ALTER COLUMN id_category SET DEFAULT nextval('public.category_id_category_seq'::regclass);


--
-- Name: item id_item; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.item ALTER COLUMN id_item SET DEFAULT nextval('public.item_id_item_seq'::regclass);


--
-- Name: item_image id_item_image; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.item_image ALTER COLUMN id_item_image SET DEFAULT nextval('public.item_image_id_item_image_seq'::regclass);


--
-- Name: place id_place; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.place ALTER COLUMN id_place SET DEFAULT nextval('public."Place_id_place_seq"'::regclass);


--
-- Name: place_image id_place_image; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.place_image ALTER COLUMN id_place_image SET DEFAULT nextval('public.place_image_id_place_image_seq'::regclass);


--
-- Name: place_type id_place_type; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.place_type ALTER COLUMN id_place_type SET DEFAULT nextval('public.place_type_id_place_type_seq'::regclass);


--
-- Name: user id_user; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN id_user SET DEFAULT nextval('public.user_id_user_seq'::regclass);


--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.category (id_category, category_name) FROM stdin;
\.
COPY public.category (id_category, category_name) FROM '$$PATH$$/2883.dat';

--
-- Data for Name: item; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.item (id_item, item_name, id_category, id_place, description, id_user) FROM stdin;
\.
COPY public.item (id_item, item_name, id_category, id_place, description, id_user) FROM '$$PATH$$/2879.dat';

--
-- Data for Name: item_image; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.item_image (id_item_image, image_location, priority, id_item) FROM stdin;
\.
COPY public.item_image (id_item_image, image_location, priority, id_item) FROM '$$PATH$$/2881.dat';

--
-- Data for Name: place; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.place (description, id_place, place_name, id_outer_place, id_place_type, id_user) FROM stdin;
\.
COPY public.place (description, id_place, place_name, id_outer_place, id_place_type, id_user) FROM '$$PATH$$/2873.dat';

--
-- Data for Name: place_image; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.place_image (id_place_image, image_location, priority, id_place) FROM stdin;
\.
COPY public.place_image (id_place_image, image_location, priority, id_place) FROM '$$PATH$$/2877.dat';

--
-- Data for Name: place_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.place_type (id_place_type, place_type_name) FROM stdin;
\.
COPY public.place_type (id_place_type, place_type_name) FROM '$$PATH$$/2875.dat';

--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id_user, user_email, login, name, surname, password) FROM stdin;
\.
COPY public."user" (id_user, user_email, login, name, surname, password) FROM '$$PATH$$/2885.dat';

--
-- Name: Place_id_place_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Place_id_place_seq"', 3, true);


--
-- Name: category_id_category_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.category_id_category_seq', 1, false);


--
-- Name: item_id_item_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.item_id_item_seq', 2, true);


--
-- Name: item_image_id_item_image_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.item_image_id_item_image_seq', 1, false);


--
-- Name: place_image_id_place_image_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.place_image_id_place_image_seq', 1, false);


--
-- Name: place_type_id_place_type_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.place_type_id_place_type_seq', 3, true);


--
-- Name: user_id_user_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_user_seq', 1, true);


--
-- Name: place Place_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.place
    ADD CONSTRAINT "Place_pkey" PRIMARY KEY (id_place);


--
-- Name: category category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (id_category);


--
-- Name: item_image item_image_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.item_image
    ADD CONSTRAINT item_image_pkey PRIMARY KEY (id_item_image);


--
-- Name: item item_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.item
    ADD CONSTRAINT item_pkey PRIMARY KEY (id_item);


--
-- Name: place_image place_image_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.place_image
    ADD CONSTRAINT place_image_pkey PRIMARY KEY (id_place_image);


--
-- Name: place_type place_type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.place_type
    ADD CONSTRAINT place_type_pkey PRIMARY KEY (id_place_type);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id_user);


--
-- Name: item item_id_category_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.item
    ADD CONSTRAINT item_id_category_fkey FOREIGN KEY (id_category) REFERENCES public.category(id_category) NOT VALID;


--
-- Name: item item_id_place_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.item
    ADD CONSTRAINT item_id_place_fkey FOREIGN KEY (id_place) REFERENCES public.place(id_place) NOT VALID;


--
-- Name: item item_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.item
    ADD CONSTRAINT item_id_user_fkey FOREIGN KEY (id_user) REFERENCES public."user"(id_user) NOT VALID;


--
-- Name: item_image item_image_id_item_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.item_image
    ADD CONSTRAINT item_image_id_item_fkey FOREIGN KEY (id_item) REFERENCES public.item(id_item);


--
-- Name: place place_id_place_type_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.place
    ADD CONSTRAINT place_id_place_type_fkey FOREIGN KEY (id_place_type) REFERENCES public.place_type(id_place_type) NOT VALID;


--
-- Name: place place_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.place
    ADD CONSTRAINT place_id_user_fkey FOREIGN KEY (id_user) REFERENCES public."user"(id_user) NOT VALID;


--
-- Name: place_image place_image_id_place_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.place_image
    ADD CONSTRAINT place_image_id_place_fkey FOREIGN KEY (id_place) REFERENCES public.place(id_place);


--
-- PostgreSQL database dump complete
--

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      