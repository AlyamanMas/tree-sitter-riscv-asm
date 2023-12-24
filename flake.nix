{
  description = "A tree-sitter parser for RISC-V assembly";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    systems.url = "github:nix-systems/default";
  };

  outputs = { self, nixpkgs, systems, ... } @ inputs:
    let
      eachSystem = f:
        nixpkgs.lib.genAttrs (import systems) (
          system:
          f nixpkgs.legacyPackages.${system}
        );
    in
    {
      devShells = eachSystem (pkgs: {
        default = pkgs.mkShell {
          buildInputs = [
            pkgs.bun
            pkgs.nodejs
            pkgs.yarn
            pkgs.nodePackages.typescript
            pkgs.nodePackages.typescript-language-server
            pkgs.graphviz
            pkgs.tree-sitter
          ];
        };
      });
    };
}
