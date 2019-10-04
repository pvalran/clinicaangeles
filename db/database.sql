create table agenda(
  id integer primary key,
  persona_id integer not null,
  catmaster_id integer not null,
  descripcion integer not null,
  deleted boolean null
);

create table consulta(
  id integer primary key,
  persona_id integer not null,
  temperatura string not null,
  presion string not null,
  frecuencia string not null,
  sintomas string not null,
  carac_fisica string not null,
  diagnostico string not null,
  tratamiento string not null,
  deleted boolean null
);

create table direccion(
  id integer primary key,
  persona_id integer not null,
  calle string not null,
  numero string not null,
  entre string null,
  colonia string not null,
  municipio string not null,
  deleted boolean null
);

create table medicamento(
  id integer primary key,
  receta_id integer not null,
  descripcion string not null,
  dosis string not null,
  via_administracion string null,
  tiempo string not null,
  duracion string not null,
  deleted boolean null
);

create table persona(
  id integer primary key,
  nombre string null,
  apepat string null,
  apemat string not null,
  fecha_nacimiento date not null,
  sexo string not null,
  sangre string null,
  altura string not null,
  peso string not null,
  deleted boolean null
);

create table receta(
  id integer primary key,
  persona_id integer not null,
  consulta_id integer not null,
  fecha_alta date not null,
  descripcion string null,
  deleted boolean null
);

create table expediente(
  id integer primary key,
  persona_id integer not null,
  catmaster_id integer not null,
  descripcion string not null,
  deleted boolean null
);

create table catmaster(
  id integer primary key,
  catalogo string not null,
  etiqueta string not null,
  etiqueta_corto string null,
  codigo string null,
  orden integer null,
  parent_id integer null,
  deleted boolean null
);


