/**
* @param {string[]} array
* @returns {string[]}
*/
function capitalize_merge_array(array) {
  let new_arr = [...array];
  for (const i of array) {
    new_arr.push(i.toUpperCase());
  }
  return new_arr;
}

const WHITESPACE = /[\t ,\n]+/;

// TODO: check base from pseudo
// TODO: Also check that each extension has the right instructions
const SUPPORTED_INSTRUCTIONS = {
  RV32I: {
    R_TYPE: ["xor", "add", "and", "div", "divu", "mul", "sub", "sll", "slt", "sltu", "srl", "sra", "or",],
    I_TYPE: ["addi", "slti", "slti", "xori", "ori", "andi", "slli", "srli", "srai", "lw", "lh", "lb", "lbu", "lhu", "jalr",],
    S_TYPE: ["sw", "sb", "sh"],
    B_TYPE: ["beq", "bne", "blt", "bge", "bltu", "bgeu"],
    U_TYPE: ["auipc", "lui"],
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

const I_TYPE_NAMES = [
  ...SUPPORTED_INSTRUCTIONS.RV32I.I_TYPE,
]
const R_TYPE_NAMES = [
  ...SUPPORTED_INSTRUCTIONS.RV32I.R_TYPE,
]
const S_TYPE_NAMES = [
  ...SUPPORTED_INSTRUCTIONS.RV32I.S_TYPE,
]
const B_TYPE_NAMES = [
  ...SUPPORTED_INSTRUCTIONS.RV32I.B_TYPE,
]
const U_TYPE_NAMES = [
  ...SUPPORTED_INSTRUCTIONS.RV32I.U_TYPE,
  ...SUPPORTED_INSTRUCTIONS.PSEUDO_INSTRUCTIONS.U_TYPE,
]
const J_TYPE_NAMES = [
  ...SUPPORTED_INSTRUCTIONS.RV32I.J_TYPE,
  ...SUPPORTED_INSTRUCTIONS.PSEUDO_INSTRUCTIONS.J_TYPE,
]
const INSTRUCTIONS_ARR = [
  ...I_TYPE_NAMES,
  ...R_TYPE_NAMES,
  ...S_TYPE_NAMES,
  ...B_TYPE_NAMES,
  ...U_TYPE_NAMES,
  ...J_TYPE_NAMES,
]

const REGISTERS = {
  NORMAL_REGISTERS: [
    "zero", "ra", "sp", "gp", "tp", "t0", "t1", "t2", "t3", "t4", "t5", "t6", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "s0", "s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9", "s10", "s11", "x0", "x2", "x3", "x4", "x5", "x6", "x7", "x8", "x9", "x10", "x11", "x12", "x13", "x14", "x14", "x15", "x17", "x18", "x19", "x20", "x21", "x22", "x23", "x24", "x25", "x26", "x27", "x28", "x29", "x30", "x31",],
  FLOAT_REGISTERS: [
    // TODO: add
  ],
}

module.exports = grammar({
  name: 'riscv_asm',

  extras: $ => [
    WHITESPACE,
    $._comment,
  ],
  rules: {
    source_file: $ => repeat($.text_section),

    _definition: $ => choice(
      $.instruction,
      $.label,
    ),

    instruction: $ => prec.left(10, seq(
      field('name', $.instruction_name),
      repeat(choice(
        $.immediate,
        $.register,
        seq(
          $.immediate,
          "(",
          $.register,
          ")",
        ),
        $.identifier,
      ))
    )),

    instruction_name: () => token(choice(...capitalize_merge_array(
      INSTRUCTIONS_ARR
    ))),

    label: $ => seq(
      field('name', $.identifier),
      ":",
    ),

    register: () => prec(10, choice(...REGISTERS.NORMAL_REGISTERS)),

    immediate: () => choice(
      /-?0x\d+/,
      /-?\d+/
    ),

    identifier: () => prec(-2, /[A-Za-z._$]+[A-Za-z0-9._$]+/),

    _comment: () => token(prec.right(10, /#.*/)),

    text_section: $ => prec.right(choice(
      seq(
        ".text\n",
        repeat(seq(optional($._definition), "\n")),
      ),
      seq(
        repeat1(seq($._definition, "\n")),
      ),
    )),
  }
});
