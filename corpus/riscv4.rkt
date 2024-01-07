=========
Sections
=========

.data
	.c_var: .word 0x1234, 2, 'h'
	.align 2
	hello: .word 0x23
	s1: .ascii "hello world", "wow"
	.asciz "hello", "wow"
  .space 0x3
	s3: .byte 0x28, 'h', "hlow"
  s4:
.text 
setup:
	li	s0, 0xFFFF9796
main:
	beq	s0, zero, .false
.return:
	# Any exit code
	ecall

---

(source_file 
  (data_section
    (constant
      (label 
        name: (identifier))
      (store_directive
        (immediate)
        (immediate)
        (char)))
    (align
      (immediate))
    (constant
      (label
        name: (identifier))
      (store_directive 
        (immediate)))
    (constant 
      (label
        name: (identifier))
      (store_directive
        (string)
        (string)))
    (store_directive
      (string)
      (string))
    (space
      (immediate))
    (constant 
      (label
        name: (identifier))
      (store_directive 
        (immediate)
        (char)
        (string)))
    (label 
      name: (identifier)))
  (text_section
    (label
      name: (identifier))
    (instruction
      name: (instruction_name)
      (register)
      (immediate))
    (label
      name: (identifier))
    (instruction
      name: (instruction_name)
      (register)
      (register)
      (identifier))
    (label
      name: (identifier))
    (instruction
      name: (instruction_name))))
