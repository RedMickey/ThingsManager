toc.dat                                                                                             0000600 0004000 0002000 00000051504 13575400353 0014451 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        PGDMP           .                w            thingsManager    11.5    11.5 H    \           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false         ]           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false         ^           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                       false         _           1262    16393    thingsManager    DATABASE     �   CREATE DATABASE "thingsManager" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Russian_Russia.1251' LC_CTYPE = 'Russian_Russia.1251';
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
       public       postgres    false    197         `           0    0    Place_id_place_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public."Place_id_place_seq" OWNED BY public.place.id_place;
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
       public       postgres    false    207         a           0    0    category_id_category_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.category_id_category_seq OWNED BY public.category.id_category;
            public       postgres    false    206         �            1259    16572    hibernate_sequence    SEQUENCE     {   CREATE SEQUENCE public.hibernate_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.hibernate_sequence;
       public       postgres    false         �            1259    16433    item    TABLE     f  CREATE TABLE public.item (
    id_item integer NOT NULL,
    item_name character varying(150) NOT NULL,
    id_category integer,
    id_place integer,
    description text,
    id_user integer NOT NULL,
    creation_timestamp timestamp(6) with time zone DEFAULT now(),
    update_timestamp timestamp(6) with time zone DEFAULT now(),
    id_status integer
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
       public       postgres    false    203         b           0    0    item_id_item_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.item_id_item_seq OWNED BY public.item.id_item;
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
       public       postgres    false    205         c           0    0    item_image_id_item_image_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.item_image_id_item_image_seq OWNED BY public.item_image.id_item_image;
            public       postgres    false    204         �            1259    16610    item_status    TABLE     t   CREATE TABLE public.item_status (
    id_status integer NOT NULL,
    status_name character varying(50) NOT NULL
);
    DROP TABLE public.item_status;
       public         postgres    false         �            1259    16608    item_status_id_status_seq    SEQUENCE     �   CREATE SEQUENCE public.item_status_id_status_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.item_status_id_status_seq;
       public       postgres    false    212         d           0    0    item_status_id_status_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.item_status_id_status_seq OWNED BY public.item_status.id_status;
            public       postgres    false    211         �            1259    16420    place_image    TABLE     �   CREATE TABLE public.place_image (
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
       public       postgres    false    201         e           0    0    place_image_id_place_image_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.place_image_id_place_image_seq OWNED BY public.place_image.id_place_image;
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
       public       postgres    false    199         f           0    0    place_type_id_place_type_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.place_type_id_place_type_seq OWNED BY public.place_type.id_place_type;
            public       postgres    false    198         �            1259    16566    sys_user    TABLE       CREATE TABLE public.sys_user (
    id_sys_user integer NOT NULL,
    user_email character varying(80) NOT NULL,
    login character varying(50),
    name character varying(50) NOT NULL,
    surname character varying(50),
    password character varying(200) NOT NULL
);
    DROP TABLE public.sys_user;
       public         postgres    false         �            1259    16564    sys_user_id_sys_user_seq    SEQUENCE     �   CREATE SEQUENCE public.sys_user_id_sys_user_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.sys_user_id_sys_user_seq;
       public       postgres    false    209         g           0    0    sys_user_id_sys_user_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.sys_user_id_sys_user_seq OWNED BY public.sys_user.id_sys_user;
            public       postgres    false    208         �
           2604    16460    category id_category    DEFAULT     |   ALTER TABLE ONLY public.category ALTER COLUMN id_category SET DEFAULT nextval('public.category_id_category_seq'::regclass);
 C   ALTER TABLE public.category ALTER COLUMN id_category DROP DEFAULT;
       public       postgres    false    206    207    207         �
           2604    16436    item id_item    DEFAULT     l   ALTER TABLE ONLY public.item ALTER COLUMN id_item SET DEFAULT nextval('public.item_id_item_seq'::regclass);
 ;   ALTER TABLE public.item ALTER COLUMN id_item DROP DEFAULT;
       public       postgres    false    203    202    203         �
           2604    16447    item_image id_item_image    DEFAULT     �   ALTER TABLE ONLY public.item_image ALTER COLUMN id_item_image SET DEFAULT nextval('public.item_image_id_item_image_seq'::regclass);
 G   ALTER TABLE public.item_image ALTER COLUMN id_item_image DROP DEFAULT;
       public       postgres    false    204    205    205         �
           2604    16613    item_status id_status    DEFAULT     ~   ALTER TABLE ONLY public.item_status ALTER COLUMN id_status SET DEFAULT nextval('public.item_status_id_status_seq'::regclass);
 D   ALTER TABLE public.item_status ALTER COLUMN id_status DROP DEFAULT;
       public       postgres    false    212    211    212         �
           2604    16399    place id_place    DEFAULT     r   ALTER TABLE ONLY public.place ALTER COLUMN id_place SET DEFAULT nextval('public."Place_id_place_seq"'::regclass);
 =   ALTER TABLE public.place ALTER COLUMN id_place DROP DEFAULT;
       public       postgres    false    196    197    197         �
           2604    16423    place_image id_place_image    DEFAULT     �   ALTER TABLE ONLY public.place_image ALTER COLUMN id_place_image SET DEFAULT nextval('public.place_image_id_place_image_seq'::regclass);
 I   ALTER TABLE public.place_image ALTER COLUMN id_place_image DROP DEFAULT;
       public       postgres    false    200    201    201         �
           2604    16410    place_type id_place_type    DEFAULT     �   ALTER TABLE ONLY public.place_type ALTER COLUMN id_place_type SET DEFAULT nextval('public.place_type_id_place_type_seq'::regclass);
 G   ALTER TABLE public.place_type ALTER COLUMN id_place_type DROP DEFAULT;
       public       postgres    false    199    198    199         �
           2604    16569    sys_user id_sys_user    DEFAULT     |   ALTER TABLE ONLY public.sys_user ALTER COLUMN id_sys_user SET DEFAULT nextval('public.sys_user_id_sys_user_seq'::regclass);
 C   ALTER TABLE public.sys_user ALTER COLUMN id_sys_user DROP DEFAULT;
       public       postgres    false    209    208    209         T          0    16457    category 
   TABLE DATA               >   COPY public.category (id_category, category_name) FROM stdin;
    public       postgres    false    207       2900.dat P          0    16433    item 
   TABLE DATA               �   COPY public.item (id_item, item_name, id_category, id_place, description, id_user, creation_timestamp, update_timestamp, id_status) FROM stdin;
    public       postgres    false    203       2896.dat R          0    16444 
   item_image 
   TABLE DATA               V   COPY public.item_image (id_item_image, image_location, priority, id_item) FROM stdin;
    public       postgres    false    205       2898.dat Y          0    16610    item_status 
   TABLE DATA               =   COPY public.item_status (id_status, status_name) FROM stdin;
    public       postgres    false    212       2905.dat J          0    16396    place 
   TABLE DATA               j   COPY public.place (description, id_place, place_name, id_outer_place, id_place_type, id_user) FROM stdin;
    public       postgres    false    197       2890.dat N          0    16420    place_image 
   TABLE DATA               Y   COPY public.place_image (id_place_image, image_location, priority, id_place) FROM stdin;
    public       postgres    false    201       2894.dat L          0    16407 
   place_type 
   TABLE DATA               D   COPY public.place_type (id_place_type, place_type_name) FROM stdin;
    public       postgres    false    199       2892.dat V          0    16566    sys_user 
   TABLE DATA               [   COPY public.sys_user (id_sys_user, user_email, login, name, surname, password) FROM stdin;
    public       postgres    false    209       2902.dat h           0    0    Place_id_place_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public."Place_id_place_seq"', 6, true);
            public       postgres    false    196         i           0    0    category_id_category_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.category_id_category_seq', 1, true);
            public       postgres    false    206         j           0    0    hibernate_sequence    SEQUENCE SET     @   SELECT pg_catalog.setval('public.hibernate_sequence', 1, true);
            public       postgres    false    210         k           0    0    item_id_item_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.item_id_item_seq', 4, true);
            public       postgres    false    202         l           0    0    item_image_id_item_image_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.item_image_id_item_image_seq', 1, false);
            public       postgres    false    204         m           0    0    item_status_id_status_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.item_status_id_status_seq', 2, true);
            public       postgres    false    211         n           0    0    place_image_id_place_image_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.place_image_id_place_image_seq', 1, false);
            public       postgres    false    200         o           0    0    place_type_id_place_type_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.place_type_id_place_type_seq', 3, true);
            public       postgres    false    198         p           0    0    sys_user_id_sys_user_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.sys_user_id_sys_user_seq', 11, true);
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
           2606    16615    item_status item_status_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.item_status
    ADD CONSTRAINT item_status_pkey PRIMARY KEY (id_status);
 F   ALTER TABLE ONLY public.item_status DROP CONSTRAINT item_status_pkey;
       public         postgres    false    212         �
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
           2606    16571    sys_user sys_user_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.sys_user
    ADD CONSTRAINT sys_user_pkey PRIMARY KEY (id_sys_user);
 @   ALTER TABLE ONLY public.sys_user DROP CONSTRAINT sys_user_pkey;
       public         postgres    false    209         �
           2606    16585     sys_user sys_user_user_email_key 
   CONSTRAINT     a   ALTER TABLE ONLY public.sys_user
    ADD CONSTRAINT sys_user_user_email_key UNIQUE (user_email);
 J   ALTER TABLE ONLY public.sys_user DROP CONSTRAINT sys_user_user_email_key;
       public         postgres    false    209         �
           2606    16586 !   place fksxbemjvfe8t4hv0854h14d8tc    FK CONSTRAINT     �   ALTER TABLE ONLY public.place
    ADD CONSTRAINT fksxbemjvfe8t4hv0854h14d8tc FOREIGN KEY (id_outer_place) REFERENCES public.place(id_place);
 K   ALTER TABLE ONLY public.place DROP CONSTRAINT fksxbemjvfe8t4hv0854h14d8tc;
       public       postgres    false    2742    197    197         �
           2606    16463    item item_id_category_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.item
    ADD CONSTRAINT item_id_category_fkey FOREIGN KEY (id_category) REFERENCES public.category(id_category) NOT VALID;
 D   ALTER TABLE ONLY public.item DROP CONSTRAINT item_id_category_fkey;
       public       postgres    false    203    2752    207         �
           2606    16468    item item_id_place_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.item
    ADD CONSTRAINT item_id_place_fkey FOREIGN KEY (id_place) REFERENCES public.place(id_place) NOT VALID;
 A   ALTER TABLE ONLY public.item DROP CONSTRAINT item_id_place_fkey;
       public       postgres    false    203    197    2742         �
           2606    16616    item item_id_status_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.item
    ADD CONSTRAINT item_id_status_fkey FOREIGN KEY (id_status) REFERENCES public.item_status(id_status) NOT VALID;
 B   ALTER TABLE ONLY public.item DROP CONSTRAINT item_id_status_fkey;
       public       postgres    false    212    203    2758         �
           2606    16574    item item_id_user_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.item
    ADD CONSTRAINT item_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.sys_user(id_sys_user) NOT VALID;
 @   ALTER TABLE ONLY public.item DROP CONSTRAINT item_id_user_fkey;
       public       postgres    false    2754    209    203         �
           2606    16450 "   item_image item_image_id_item_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.item_image
    ADD CONSTRAINT item_image_id_item_fkey FOREIGN KEY (id_item) REFERENCES public.item(id_item);
 L   ALTER TABLE ONLY public.item_image DROP CONSTRAINT item_image_id_item_fkey;
       public       postgres    false    2748    205    203         �
           2606    16413    place place_id_place_type_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.place
    ADD CONSTRAINT place_id_place_type_fkey FOREIGN KEY (id_place_type) REFERENCES public.place_type(id_place_type) NOT VALID;
 H   ALTER TABLE ONLY public.place DROP CONSTRAINT place_id_place_type_fkey;
       public       postgres    false    199    197    2744         �
           2606    16579    place place_id_user_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.place
    ADD CONSTRAINT place_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.sys_user(id_sys_user) NOT VALID;
 B   ALTER TABLE ONLY public.place DROP CONSTRAINT place_id_user_fkey;
       public       postgres    false    197    209    2754         �
           2606    16426 %   place_image place_image_id_place_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.place_image
    ADD CONSTRAINT place_image_id_place_fkey FOREIGN KEY (id_place) REFERENCES public.place(id_place);
 O   ALTER TABLE ONLY public.place_image DROP CONSTRAINT place_image_id_place_fkey;
       public       postgres    false    2742    197    201                                                                                                                                                                                                    2900.dat                                                                                            0000600 0004000 0002000 00000000041 13575400353 0014244 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1	Моя категория
\.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               2896.dat                                                                                            0000600 0004000 0002000 00000000433 13575400353 0014267 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        2	Тетрадь	1	3	Моя тетрадь	1	2019-12-14 19:45:58.702507+03	2019-12-14 19:45:58.702507+03	\N
3	Вещь	1	3	тест	1	2019-12-14 19:45:58.702507+03	2019-12-14 19:45:58.702507+03	\N
4	fdgfd	\N	5	\N	1	2019-12-14 19:45:58.702507+03	2019-12-14 19:45:58.702507+03	\N
\.


                                                                                                                                                                                                                                     2898.dat                                                                                            0000600 0004000 0002000 00000000005 13575400354 0014265 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           2905.dat                                                                                            0000600 0004000 0002000 00000000071 13575400354 0014255 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1	присутствует
2	отсутствует
\.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                       2890.dat                                                                                            0000600 0004000 0002000 00000000161 13575400354 0014260 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        Мой стол	3	Стол	5	3	1
Мой дом	6	Дом	\N	1	1
Моя комната	5	Комната	6	2	1
\.


                                                                                                                                                                                                                                                                                                                                                                                                               2894.dat                                                                                            0000600 0004000 0002000 00000000005 13575400354 0014261 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           2892.dat                                                                                            0000600 0004000 0002000 00000000072 13575400354 0014263 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1	Строения
2	Помещения
3	Место
\.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                      2902.dat                                                                                            0000600 0004000 0002000 00000001326 13575400354 0014256 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        3	123	\N	dsdsfs	\N	$2a$10$7cWcyu3fZ38l2u7fh3Ngv.xCxUNW/IUWG8BWWKgQ9h3vUw956itIq
4	test3@mail.ru	\N	test1	\N	$2a$10$4AulJcGVF2tN9gBKRSkZQufJo5CE.dzHl3X88FRpXO3a4/1/Am0L2
5	test5@mail.ru	\N	dfgdf	\N	$2a$10$YTyIOYUsvRduuh41LEJA1OT01NrmwVgujqduiCIsWJuJvgmOYhh1W
6	test6@mail.ru	\N	try	\N	$2a$10$En8aOjkWwtezcBHW9005JeT9nP4w7GF7gqi5GVtfjqwDuK8TzpH12
10	test7@mail.ru	\N	try	\N	$2a$10$D42/FZ/OxLOEL2YSlnKcmu5KN0pHcpYH8Vlr45V2mz.h93UMa0VQa
11	mihax2013@yandex.ru	\N	test	\N	$2a$10$gKqAiUSDN/wfzS.VrT6TnuRzz/zmck.q9g/78SNdtIAd1Y4gMB7qC
1	test@mail.ru	\N	аываыва	test	$2a$10$mcMiFQp3RPka9Ea3RjWRWOvNU.WmBI2in17vXHz.8Fd.VkRwLWDE6
2	test2@mail.ru	\N	аываф	\N	$2a$10$mcMiFQp3RPka9Ea3RjWRWOvNU.WmBI2in17vXHz.8Fd.VkRwLWDE6
\.


                                                                                                                                                                                                                                                                                                          restore.sql                                                                                         0000600 0004000 0002000 00000041744 13575400354 0015404 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        --
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
-- Name: hibernate_sequence; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.hibernate_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.hibernate_sequence OWNER TO postgres;

--
-- Name: item; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.item (
    id_item integer NOT NULL,
    item_name character varying(150) NOT NULL,
    id_category integer,
    id_place integer,
    description text,
    id_user integer NOT NULL,
    creation_timestamp timestamp(6) with time zone DEFAULT now(),
    update_timestamp timestamp(6) with time zone DEFAULT now(),
    id_status integer
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
-- Name: item_status; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.item_status (
    id_status integer NOT NULL,
    status_name character varying(50) NOT NULL
);


ALTER TABLE public.item_status OWNER TO postgres;

--
-- Name: item_status_id_status_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.item_status_id_status_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.item_status_id_status_seq OWNER TO postgres;

--
-- Name: item_status_id_status_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.item_status_id_status_seq OWNED BY public.item_status.id_status;


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
-- Name: sys_user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sys_user (
    id_sys_user integer NOT NULL,
    user_email character varying(80) NOT NULL,
    login character varying(50),
    name character varying(50) NOT NULL,
    surname character varying(50),
    password character varying(200) NOT NULL
);


ALTER TABLE public.sys_user OWNER TO postgres;

--
-- Name: sys_user_id_sys_user_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sys_user_id_sys_user_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sys_user_id_sys_user_seq OWNER TO postgres;

--
-- Name: sys_user_id_sys_user_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sys_user_id_sys_user_seq OWNED BY public.sys_user.id_sys_user;


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
-- Name: item_status id_status; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.item_status ALTER COLUMN id_status SET DEFAULT nextval('public.item_status_id_status_seq'::regclass);


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
-- Name: sys_user id_sys_user; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sys_user ALTER COLUMN id_sys_user SET DEFAULT nextval('public.sys_user_id_sys_user_seq'::regclass);


--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.category (id_category, category_name) FROM stdin;
\.
COPY public.category (id_category, category_name) FROM '$$PATH$$/2900.dat';

--
-- Data for Name: item; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.item (id_item, item_name, id_category, id_place, description, id_user, creation_timestamp, update_timestamp, id_status) FROM stdin;
\.
COPY public.item (id_item, item_name, id_category, id_place, description, id_user, creation_timestamp, update_timestamp, id_status) FROM '$$PATH$$/2896.dat';

--
-- Data for Name: item_image; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.item_image (id_item_image, image_location, priority, id_item) FROM stdin;
\.
COPY public.item_image (id_item_image, image_location, priority, id_item) FROM '$$PATH$$/2898.dat';

--
-- Data for Name: item_status; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.item_status (id_status, status_name) FROM stdin;
\.
COPY public.item_status (id_status, status_name) FROM '$$PATH$$/2905.dat';

--
-- Data for Name: place; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.place (description, id_place, place_name, id_outer_place, id_place_type, id_user) FROM stdin;
\.
COPY public.place (description, id_place, place_name, id_outer_place, id_place_type, id_user) FROM '$$PATH$$/2890.dat';

--
-- Data for Name: place_image; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.place_image (id_place_image, image_location, priority, id_place) FROM stdin;
\.
COPY public.place_image (id_place_image, image_location, priority, id_place) FROM '$$PATH$$/2894.dat';

--
-- Data for Name: place_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.place_type (id_place_type, place_type_name) FROM stdin;
\.
COPY public.place_type (id_place_type, place_type_name) FROM '$$PATH$$/2892.dat';

--
-- Data for Name: sys_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sys_user (id_sys_user, user_email, login, name, surname, password) FROM stdin;
\.
COPY public.sys_user (id_sys_user, user_email, login, name, surname, password) FROM '$$PATH$$/2902.dat';

--
-- Name: Place_id_place_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Place_id_place_seq"', 6, true);


--
-- Name: category_id_category_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.category_id_category_seq', 1, true);


--
-- Name: hibernate_sequence; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.hibernate_sequence', 1, true);


--
-- Name: item_id_item_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.item_id_item_seq', 4, true);


--
-- Name: item_image_id_item_image_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.item_image_id_item_image_seq', 1, false);


--
-- Name: item_status_id_status_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.item_status_id_status_seq', 2, true);


--
-- Name: place_image_id_place_image_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.place_image_id_place_image_seq', 1, false);


--
-- Name: place_type_id_place_type_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.place_type_id_place_type_seq', 3, true);


--
-- Name: sys_user_id_sys_user_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sys_user_id_sys_user_seq', 11, true);


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
-- Name: item_status item_status_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.item_status
    ADD CONSTRAINT item_status_pkey PRIMARY KEY (id_status);


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
-- Name: sys_user sys_user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sys_user
    ADD CONSTRAINT sys_user_pkey PRIMARY KEY (id_sys_user);


--
-- Name: sys_user sys_user_user_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sys_user
    ADD CONSTRAINT sys_user_user_email_key UNIQUE (user_email);


--
-- Name: place fksxbemjvfe8t4hv0854h14d8tc; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.place
    ADD CONSTRAINT fksxbemjvfe8t4hv0854h14d8tc FOREIGN KEY (id_outer_place) REFERENCES public.place(id_place);


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
-- Name: item item_id_status_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.item
    ADD CONSTRAINT item_id_status_fkey FOREIGN KEY (id_status) REFERENCES public.item_status(id_status) NOT VALID;


--
-- Name: item item_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.item
    ADD CONSTRAINT item_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.sys_user(id_sys_user) NOT VALID;


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
    ADD CONSTRAINT place_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.sys_user(id_sys_user) NOT VALID;


--
-- Name: place_image place_image_id_place_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.place_image
    ADD CONSTRAINT place_image_id_place_fkey FOREIGN KEY (id_place) REFERENCES public.place(id_place);


--
-- PostgreSQL database dump complete
--

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            