CREATE TABLE `agenda_db`.`usuarios` (
   `id` INT(11) NOT NULL ,
   `nombre_completo` VARCHAR(30) NOT NULL ,
   `psw` VARCHAR(15) NOT NULL ,
   `email` VARCHAR(45) NOT NULL ,
   `fecha_nacimiento` DATE NOT NULL
 ) ENGINE = InnoDB CHARSET=latin1 COLLATE latin1_spanish_ci;

-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios` ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `email-user` (`email`);
ALTER TABLE `usuarios` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1 ;

--
-- Volcado de datos para la tabla `usuarios`
--
INSERT INTO `usuarios` (`id`, `nombre_completo`, `psw`, `email`, `fecha_nacimiento`) VALUES
(1, 'Eduardo Koch', '12345', 'eduardo.koch@next-u.com', '1969-07-22');


CREATE TABLE `eventos` (
  `id` int(11) NOT NULL,
  `fk_usuario` int(11) NOT NULL,
  `titulo` varchar(45) NOT NULL,
  `fecha_inicio` date,
  `hora_inicio` TIME DEFAULT NULL,
  `fecha_finalizacion` date,
  `hora_finalizacion` TIME NULL DEFAULT NULL,
  `dia_completo` boolean not null default 0
) ENGINE = InnoDB CHARSET=latin1 COLLATE latin1_spanish_ci;

ALTER TABLE `eventos` ADD PRIMARY KEY (`id`);
ALTER TABLE `eventos` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1 ;
ALTER TABLE `eventos` ADD CONSTRAINT usuarios_eventos FOREIGN KEY(fk_usuario) REFERENCES usuarios(id) ;
