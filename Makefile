OUTPUT_DIR := out
SCRIPT_DIR := $(OUTPUT_DIR)/scripts
STYLE_DIR := $(OUTPUT_DIR)/style

.PHONY: all
all: $(OUTPUT_DIR)/game.html $(STYLE_DIR)/master.css $(SCRIPT_DIR)/script.js

$(OUTPUT_DIR):
	mkdir -p $(OUTPUT_DIR)

$(STYLE_DIR):
	mkdir -p $(STYLE_DIR)

$(SCRIPT_DIR):
	mkdir -p $(SCRIPT_DIR)

$(OUTPUT_DIR)/game.html: $(OUTPUT_DIR)
	cp src/game.html $(OUTPUT_DIR)

$(STYLE_DIR)/master.css: $(STYLE_DIR)
	sass src/style/master.scss $(STYLE_DIR)/master.css --no-source-map

$(SCRIPT_DIR)/script.js: $(SCRIPT_DIR)
	tsc --project src/scripts --outFile $(SCRIPT_DIR)/script.js

.PHONY: clean
clean:
	rm -rf $(OUTPUT_DIR)
