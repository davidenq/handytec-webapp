# Handytec-webapp

## Información general

El presente prototipo resuelve los casos 1 y 2 propuestos como evaluación técnica para la posición de ingeniero DevOps

A continuación se presenta un `checklist` de las tareas solicitadas y cuales han sido completadas.

 **_Caso/Ejercicio 1_**
  - [x] Desplegar una aplicación desarrollada en Javascirpt en la nube de Heroku
  - [x] Crear una estrategia de versionamiento en Github
  - [x] Crear una estrategia de fusión de ramas
  - [x] **Crear un pipeline de CI/CD que pueda ser fácilmente replicable (replicable en otros proyectos? procesos?)
  - [x] Verificar que la aplicación esté desplegada sin ingresar al sitio web

**_Caso/Ejercicio 2_**
- [x] La aplicación anterior debe tener una imagen Docker para ser replicada por el equipo de desarrolladores en un ambiente local
- [x] Documentar (de manera general) en alguna herramienta de su preferencia, el proceso de CI/CD y versionamiento definidos
- [x] **Crear una imagen Docker con la aplicación del ejercicio anterior (similar al a 1?)
- [x] Cualquier desarrollador podrá hacer pull de la imagen y configurar en su entorno local, incluyendo el repositorio del código versionado.

> Nota: Aquellos `items` del `checklist` marcados con doble asterisco son descripciones ambiguas/duplicadas o están dentro del mismo contexto de otro `item` del `checklist`.

## Estrategia de Versionamiento

El versionamiento adoptado para el presente prototipo es [(Semver)](https://semver.org/lang/es/). Semver es ampliamente adoptado en la industria de software y permitirá que el desarrollo
de la aplicación sea ágil, rastreable y se pueda comprender el estado de un proyecto con sus dependencias.

## Estrategia de fusión de ramas


Existen multiples estrategias de flujos de git para el manejo de `branchs` entre las cuales se pueden citar:
1. [Gitflow](https://nvie.com/posts/a-successful-git-branching-model/)
2. [Github Flow](https://guides.github.com/introduction/flow/)
3. [GitLab Flow](https://docs.gitlab.com/ee/topics/gitlab_flow.html)
4. [One Flow](https://www.endoflineblog.com/oneflow-a-git-branching-model-and-workflow)
5. [Release Flow by Microsoft](https://docs.microsoft.com/en-us/azure/devops/learn/devops-at-microsoft/release-flow)- [Trunk Based Development](https://trunkbaseddevelopment.com/)

Cada una tiene sus [props y sus contras](https://medium.com/@patrickporto/4-branching-workflows-for-git-30d0aaee7bf), sin embargo la estrategia de seleccionar una de ellas está dado
por las necesidades de la empresa y los proyectos que esta maneje. Por ejemplo, Gitflow tiene muchos errores cuando los proyectos son demasiado grandes y las estrategias de CI/CD también se vuelven más 
complejas de manejarlas [https://www.endoflineblog.com/gitflow-considered-harmful]. 
Por otro lado, [Github flow](https://youtu.be/ppzIBIQz_KY) también tiene sus desventajas en procesos de CI/CD dado que el flujo de manejo de ramas y despliegues está dado por un único flujo o rama principal.

Sin embargo, en este documento, no se presenta una discusión formal acerca de las ventajas o desventajas de cada uno de los flujos. El propósito principal es proveer una estrategia inicial como propósito de demostración del flujo CI/CD
desde el desarrollo en local, hasta el despligue en la nube de Heroku.

[Gitflow](https://nvie.com/posts/a-successful-git-branching-model/) ha sido seleccionado para el presente proyecto. 

Aunque en la definición formal de Gitflow, hay una serie de branches tales como Feature, Hotfix, Support, Release, entre otras, las ramas que actualmente han sido implementadas son:

- develop: Utilizada para que los equipos de desarrolladores 
- staging
- master
  
Las ramas indicadas anteriormente tienen el propósito de demostrar el flujo completo de CI/CD, no desde el punto de vista de un desarrollador que agregará nuevas características a la aplicación, corregirá errores, etc., sino desde el punto de vista de un DevOps quién tiene la responsabilidad de gestionar las ramas principales para el proceso de integración y despliegue/entraga continua. Para mayor información de la estrategia de manejo de ramás para el equipo de desarrolladores, puede revisar [aquí](https://www.atlassian.com/es/git/tutorials/comparing-workflows/gitflow-workflow).

Para el proyecto actual, a continuación se presenta una estrategía de branchs con GitFlow
![](./assets/branching_strategy.png)

1. El desarrollador puede clonar el repositorio
2. Se realiza los cambios en su local
3. Se realiza push a la rama de develop en el repositorio remoto
4. Se solicita la extracción del código en la rama staging
  - esta rama es utilizada para proveer un ambiente de staging para pruebas en cloud
5. Se realiza una revisión manual y una revisión automática
  - generalmente la revisión manual está asociado a una práctica de revisión de buenas prácticas de desarrollo (clean code) y versionamiento. Esta revisión se da en pares y se realiza comentarios de ser necesario cuando se requiere mejorar algo en el código, de paso la solicitud de extracción queda rechazada.
  - la revisión automática está enfocado en la integración continua:
    - que los cambios de un desarrollador no afecten ni rompan la aplicación
    - que las pruebas unitarías pasen con éxito (si se escribieron pruebas unitarias)
    - que el coverage del código cumpla con un umbral mínimo. Por ejemplo, sin un desarrollador realiza unos cambios sustanciales sin escribir pruebas unitarias, el coverage del código puede bajar a tal punto de que no cumple el requisito mínimo de cubrir el código.
    - que el proceso de building de la imagen docker (si es que se trabaja con contenedores) puedan realizar el proceso de building sin problemas (dependencias, versiones, imagenes bases desactualizadas, herramientas de compilación, etc., podrían dar problemas)
    - que el proceso de deploy en el ambiente correspondiente esté ok.
Con todas estas revisiones cumplidas, ahora se puede realizar la aprobación de la solicitud de estracción en la rama staging
6. Se realiza una solicitud de extracción (manual o automática) a la rama master para desplegar en producción. Esto depende de varios factores como por ejemplo, cambios críticos o hotfixes que después de haberse verificado en la rama de staging, ya es posible pasar a producción previa aprobación del core del negocio. Además, puede que se agreguen nuevas funcionalidades y que ya se hayan probado en staging, sin embargo, la aprobación de la puesta a producción quedará determinada por el core del negocio. Por lo tanto, se realiza una planificación para dicho proceso.

> Nota: Las solicitudes de extración de cualquier rama que no sea staging serán bloqueadas



# Pruebas

## Requerimientos
- Docker
- Docker-Compose (no obligatorio)
- Make (no obligatorio) (Para GNU/Linux y Mac, viene instalado por defecto. Para Windows puede instalar make descargando los binarios [acá](http://gnuwin32.sourceforge.net/packages/make.htm))
- Node.js > 12
- Cuenta en Github
- Cuenta en Heroku
- Cuenta en Docker Hub