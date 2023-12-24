const capitalize_merge_array = (array) => {
  let new_arr = [...array];
  for (const i of array) {
    new_arr.push(i.toUpperCase());
  }
  return new_arr;
}

// Taken from the fish tree-sitter parser
const WHITESPACE = /[\u0009-\u000D\u0085\u2028\u2029\u0020\u3000\u1680\u2000-\u2006\u2008-\u200A\u205F\u00A0\u2007\u202F]+/;

// TODO: check base from pseudo
// TODO: Also check that each extension has the right instructions
const SUPPORTED_INSTRUCTIONS = {
  RV32I: {
    R_TYPE: ["xor", "add", "and", "div", "divu", "mul", "sub", "sll", "slt", "sltu", "srl", "sra", "or",],
    I_TYPE: ["addi", "slti", "slti", "xori", "ori", "andi", "slli", "srli", "srai", "lw", "lh", "lb", "lbu", "lhu", "jalr",],
    S_TYPE: ["sw", "sb", "sh"],
    B_TYPE: [],
    U_TYPE: ["auipc"],
    J_TYPE: ["jal"],
  },
  PSEUDO_INSTRUCTIONS: {
    R_TYPE: [],
    I_TYPE: [],
    S_TYPE: [],
    B_TYPE: [],
    U_TYPE: ["li"],
    J_TYPE: ["j"],
  }
}

// TODO: fix separators: not necessarily comma, could be whitespace
// TODO: make objects that, for a single type, merge both the pseudo and base types
I_TYPE_NAMES = [
  ...SUPPORTED_INSTRUCTIONS.RV32I.I_TYPE,
]
R_TYPE_NAMES = [
  ...SUPPORTED_INSTRUCTIONS.RV32I.R_TYPE,
]
S_TYPE_NAMES = [
  ...SUPPORTED_INSTRUCTIONS.RV32I.S_TYPE,
]
U_TYPE_NAMES = [
  ...SUPPORTED_INSTRUCTIONS.RV32I.U_TYPE,
  ...SUPPORTED_INSTRUCTIONS.PSEUDO_INSTRUCTIONS.U_TYPE,
]
J_TYPE_NAMES = [
  ...SUPPORTED_INSTRUCTIONS.RV32I.J_TYPE,
  ...SUPPORTED_INSTRUCTIONS.PSEUDO_INSTRUCTIONS.J_TYPE,
]

const REGISTERS = {
  NORMAL_REGISTERS: [
    "zero", "ra", "sp", "gp", "tp", "t0", "t1", "t2", "t3", "t4", "t5", "t6", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "s0", "s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9", "s10", "s11", "x0", "x2", "x3", "x4", "x5", "x6", "x7", "x8", "x9", "x10", "x11", "x12", "x13", "x14", "x14", "x15", "x17", "x18", "x19", "x20", "x21", "x22", "x23", "x24", "x25", "x26", "x27", "x28", "x29", "x30", "x31",],
  FLOAT_REGISTERS: [
    // TODO
  ],
}

module.exports = grammar({
  name: 'riscv_asm',

  extras: $ => [
    $._comment,
    WHITESPACE,
  ],
  // make instructions left associative and comments right associative
  // use alias for instructions with multiple way of doing them
  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => repeat($._definition),

    _definition: $ => choice(
      $._instruction,
      $.label
    ),

    _instruction: $ => choice(
      $.u_type_instruction,
      $.r_type_instruction,
      $.i_type_instruction,
      alias($.i_type_instruction_parens, $.i_type_instruction),
      $.s_type_instruction,
      $.j_type_instruction_label,
    ),

    u_type_instruction: $ => seq(
      field('name', $.u_type_name),
      field('rd', $.register),
      ",",
      field('immediate', $.immediate),
    ),

    u_type_name: () => choice(...capitalize_merge_array(U_TYPE_NAMES)),

    // TODO: check if commas are optional or not
    r_type_instruction: $ => seq(
      field('name', $.r_type_name),
      field('rd', $.register),
      ",",
      field('rs1', $.register),
      ",",
      field('rs2', $.register),
    ),

    r_type_name: () => choice(...capitalize_merge_array(R_TYPE_NAMES)),

    i_type_instruction: $ => seq(
      field('name', $.i_type_name),
      field('rd', $.register),
      ",",
      field('rs1', $.register),
      ",",
      field('immediate', $.immediate),
    ),

    // if blogging write about this
    i_type_instruction_parens: $ => seq(
      field('name', $.i_type_name),
      field('rd', $.register),
      ",",
      field('immediate', $.immediate),
      "(",
      field('rs1', $.register),
      ")",
    ),

    // TODO: add i_type_instruction with labels for JAL

    i_type_name: () => choice(...capitalize_merge_array(I_TYPE_NAMES)),

    s_type_instruction: $ => seq(
      field('name', $.s_type_name),
      field('rs1', $.register),
      ",",
      field('immediate', $.immediate),
      "(",
      field('rs2', $.register),
      ")",
    ),

    s_type_name: () => choice(...capitalize_merge_array(S_TYPE_NAMES)),

    j_type_instruction_label: $ => seq(
      field('name', $.j_type_name),
      field('label', $.identifier),
    ),

    j_type_name: () => choice(...capitalize_merge_array(J_TYPE_NAMES)),

    label: $ => seq(
      field('name', $.identifier),
      ":",
    ),

    register: () => prec(10, choice(...REGISTERS.NORMAL_REGISTERS)),

    immediate: () => choice(
      /-?0x\d+/,
      /-?\d+/
    ),

    // TODO: make it more rigorous. Does it accept underscores? dots?
    identifier: () => /[A-Za-z]+[A-Za-z0-9]+/,

    _comment: () => token(prec(-11, /#.*/)),
  }
});
