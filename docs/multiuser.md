# Multiuser mode

## Prerequisites
- A setup private instance of Ruby (using Docker Compose, or standalone) with multiuser mode enabled (see [here](./private.md#docker-multiuser) for more info)

---

## How to execute commands

There are two ways to execute the CLI, either using `yarn cli` or `bundler exec ruby ./cli/cli.rb`

This tutorial will use `yarn cli` as it is easier to type

## Commands

- `yarn cli` is the command to execute the CLI 
- `yarn cli help [command]` to get help with a command 
- `yarn cli create` - Create a new user
- `yarn cli delete` - Delete a user
- `yarn cli list` - List all users
- `yarn cli reset` - Reset a users password

## How to use in Docker Compose

- `docker-compose exec ruby yarn cli [command]` - where `[command]` is one of the commands listed above
