interface CommandArgument {
  name: string;
  is_required: boolean;
  is_array: boolean;
  description: string;
  default: any;
}

interface CommandOption {
  name: string;
  shortcut: string;
  accept_value: boolean;
  is_value_required: boolean;
  is_multiple: boolean;
  description: string;
  default: any;
}

interface CommandDefinition {
  arguments: Record<string, CommandArgument> | Record<string, never>;
  options: Record<string, CommandOption>;
}

export interface CommandType {
  name: string;
  description: string;
  usage: string[];
  help: string;
  definition: CommandDefinition;
  hidden: boolean;
}

export type CommandsClientComponentProps = {
  commands: CommandType[];
};
