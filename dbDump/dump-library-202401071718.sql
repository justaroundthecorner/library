PGDMP                       |            library    16.1    16.1     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    24613    library    DATABASE     }   CREATE DATABASE library WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_Pakistan.1252';
    DROP DATABASE library;
                postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                pg_database_owner    false            �           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                   pg_database_owner    false    4            �            1259    24615    users    TABLE     R   CREATE TABLE public.users (
    id bigint NOT NULL,
    name character varying
);
    DROP TABLE public.users;
       public         heap    postgres    false    4            �            1259    24614    User_id_seq    SEQUENCE     v   CREATE SEQUENCE public."User_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public."User_id_seq";
       public          postgres    false    4    216            �           0    0    User_id_seq    SEQUENCE OWNED BY     >   ALTER SEQUENCE public."User_id_seq" OWNED BY public.users.id;
          public          postgres    false    215            �            1259    24661    book_transaction    TABLE     �   CREATE TABLE public.book_transaction (
    id bigint NOT NULL,
    userid bigint,
    bookid bigint,
    borrowdate timestamp with time zone,
    returndate timestamp with time zone,
    status boolean DEFAULT false,
    score double precision
);
 $   DROP TABLE public.book_transaction;
       public         heap    postgres    false    4            �            1259    24664    book_transaction_id_seq    SEQUENCE     �   CREATE SEQUENCE public.book_transaction_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.book_transaction_id_seq;
       public          postgres    false    219    4            �           0    0    book_transaction_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.book_transaction_id_seq OWNED BY public.book_transaction.id;
          public          postgres    false    220            �            1259    24648    books    TABLE     �   CREATE TABLE public.books (
    id bigint NOT NULL,
    name character varying,
    "averageScore" double precision DEFAULT '-1'::integer
);
    DROP TABLE public.books;
       public         heap    postgres    false    4            �            1259    24651    books_id_seq    SEQUENCE     u   CREATE SEQUENCE public.books_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.books_id_seq;
       public          postgres    false    217    4            �           0    0    books_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.books_id_seq OWNED BY public.books.id;
          public          postgres    false    218            '           2604    24665    book_transaction id    DEFAULT     z   ALTER TABLE ONLY public.book_transaction ALTER COLUMN id SET DEFAULT nextval('public.book_transaction_id_seq'::regclass);
 B   ALTER TABLE public.book_transaction ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    219            %           2604    24652    books id    DEFAULT     d   ALTER TABLE ONLY public.books ALTER COLUMN id SET DEFAULT nextval('public.books_id_seq'::regclass);
 7   ALTER TABLE public.books ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217            $           2604    24618    users id    DEFAULT     e   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215    216            �          0    24661    book_transaction 
   TABLE DATA           e   COPY public.book_transaction (id, userid, bookid, borrowdate, returndate, status, score) FROM stdin;
    public          postgres    false    219          �          0    24648    books 
   TABLE DATA           9   COPY public.books (id, name, "averageScore") FROM stdin;
    public          postgres    false    217   2       �          0    24615    users 
   TABLE DATA           )   COPY public.users (id, name) FROM stdin;
    public          postgres    false    216   �       �           0    0    User_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public."User_id_seq"', 4, true);
          public          postgres    false    215            �           0    0    book_transaction_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.book_transaction_id_seq', 23, true);
          public          postgres    false    220            �           0    0    books_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.books_id_seq', 5, true);
          public          postgres    false    218            .           2606    24670 $   book_transaction book_transaction_pk 
   CONSTRAINT     b   ALTER TABLE ONLY public.book_transaction
    ADD CONSTRAINT book_transaction_pk PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.book_transaction DROP CONSTRAINT book_transaction_pk;
       public            postgres    false    219            ,           2606    24660    books books_pk 
   CONSTRAINT     L   ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_pk PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.books DROP CONSTRAINT books_pk;
       public            postgres    false    217            *           2606    24620    users user_pk 
   CONSTRAINT     K   ALTER TABLE ONLY public.users
    ADD CONSTRAINT user_pk PRIMARY KEY (id);
 7   ALTER TABLE ONLY public.users DROP CONSTRAINT user_pk;
       public            postgres    false    216            /           2606    24687 %   book_transaction book_transaction2_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.book_transaction
    ADD CONSTRAINT book_transaction2_fk FOREIGN KEY (bookid) REFERENCES public.books(id);
 O   ALTER TABLE ONLY public.book_transaction DROP CONSTRAINT book_transaction2_fk;
       public          postgres    false    4652    219    217            0           2606    24682 $   book_transaction book_transaction_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.book_transaction
    ADD CONSTRAINT book_transaction_fk FOREIGN KEY (userid) REFERENCES public.users(id);
 N   ALTER TABLE ONLY public.book_transaction DROP CONSTRAINT book_transaction_fk;
       public          postgres    false    219    216    4650            �     x���M�� ��p��G��o�!�]��G�&#� U,��ǳ\�pad}"=�Li���\��勺�2(�:I�D6��g�]݊�V���b�(D��5�R݊W[pt�bs�sfu+V}E�Z t�"z�ã*��Ώ4��Xk�%t��$�����d)���t��k���H)% -��!�B:�}�d"^��� �N?�`�� ���������[�nv�����	��E╟v����)�!� �`���� ޒ9��;��g�s��T	|Ğ�Gs�xA���
�y      �   T   x�3�tT��,)�IRi��Fz�\ƜމE%��E����\��~��E���yɩE���\����E�y�fz&�\&�&&�F\1z\\\ |��      �   7   x�3��,.J�2�t-��S8<-/��˘ӱ�8Q�8#1-��4�˄3��&F��� r�d     