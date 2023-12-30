=========
Sections
=========

.data
	.c_var: .word 0x1234, 2, 'h'
	.align 2
	hello: .word 0x23
	s1: .ascii "hello world", "wow"
	.asciz "hello", "wow"
	s3: .byte 0x28, 'h', "hlow"
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
      name: (identifier)
      (word
        (immediate)
        (immediate)
        (char)))
    (align)
    (constant
      name: (identifier)
      (word 
        (immediate)))
    (constant 
      name: (identifier)
      (ascii
        (string)
        (string)))
    (asciz
      (string)
      (string))
    (constant 
      name: (identifier)
      (byte 
        (immediate)
        (char)
        (string))))
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
