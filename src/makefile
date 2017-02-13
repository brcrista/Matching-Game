OUTPUT_DIR := ../out
SCRIPT_DIR := $(OUTPUT_DIR)/scripts
STYLE_DIR := $(OUTPUT_DIR)/style
TS_FLAGS := --alwaysStrict --noImplicitReturns --noFallthroughCasesInSwitch --noImplicitAny --removeComments --strictNullChecks --target ES2015

all: output_dir html style scripts

html: html_dir
	cp game.html $(OUTPUT_DIR)

style: style_dir
	cp style/* $(STYLE_DIR)

scripts: script_dir
	tsc scripts/*.ts $(TS_FLAGS) --outFile $(SCRIPT_DIR)/script.js

output_dir:	
	mkdir -p $(OUTPUT_DIR)

html_dir: output_dir

style_dir: output_dir
	mkdir -p $(STYLE_DIR)

script_dir: output_dir
	mkdir -p $(SCRIPT_DIR)

clean:
	rm -rf $(OUTPUT_DIR)