FROM node:12.18.3
ARG UID
ARG USER
ARG GID
ARG GROUP
RUN mkdir -p /app
RUN addgroup --gid $GID $GROUP
RUN adduser --uid $UID --ingroup $GROUP --gecos GECOS --disabled-password $USER
ADD . /app/
RUN chown -R ${USER}:${GROUP} /app
USER $USER
WORKDIR /app
RUN yarn global add gatsby-cli
ENV PATH /app/node_modules/.bin:/home/$USER/.local/bin:$PATH
#RUN yarn
EXPOSE 3000