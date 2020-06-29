OUTPUT_DIR := ../out
SCRIPT_DIR := $(OUTPUT_DIR)/scripts
STYLE_DIR := $(OUTPUT_DIR)/style

all: output_dir html style scripts

html: html_dir
	cp game.html $(OUTPUT_DIR)

style: style_dir
	# cp style/* $(STYLE_DIR)
	sass style/master.scss $(STYLE_DIR)/master.css --no-source-map

scripts: script_dir
	tsc --project scripts --outFile $(SCRIPT_DIR)/script.js

output_dir:
	mkdir -p $(OUTPUT_DIR)

html_dir: output_dir

style_dir: output_dir
	mkdir -p $(STYLE_DIR)

script_dir: output_dir
	mkdir -p $(SCRIPT_DIR)

clean:
	rm -rf $(OUTPUT_DIR)
