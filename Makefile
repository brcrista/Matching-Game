OUTPUT_DIR := dist
SCRIPT_DIR := $(OUTPUT_DIR)/scripts
STYLE_DIR := $(OUTPUT_DIR)/style
WEBPACK_CONFIG := src/scripts/webpack.config.js
BUNDLE := src/scripts/out/bundle.js

.PHONY: all
all: $(OUTPUT_DIR)/game.html $(STYLE_DIR)/main.css $(SCRIPT_DIR)/bundle.js

$(OUTPUT_DIR):
	mkdir -p $(OUTPUT_DIR)

$(STYLE_DIR):
	mkdir -p $(STYLE_DIR)

$(SCRIPT_DIR):
	mkdir -p $(SCRIPT_DIR)

$(OUTPUT_DIR)/game.html: src/game.html $(OUTPUT_DIR)
	cp $< $(OUTPUT_DIR)

$(STYLE_DIR)/main.css: src/style/main.scss $(STYLE_DIR)
	sass $< $(STYLE_DIR)/main.css

$(SCRIPT_DIR)/bundle.js: $(BUNDLE) $(SCRIPT_DIR)
	cp $< $@

$(BUNDLE): src/scripts/*.ts $(WEBPACK_CONFIG) $(SCRIPT_DIR)
	cd src/scripts && npm install && npm run build

# Aliases to make it easy to run from the command line
.PHONY: html
html: $(OUTPUT_DIR)/game.html

.PHONY: css
css: $(STYLE_DIR)/main.css

.PHONY: js
js: $(SCRIPT_DIR)/script.js

.PHONY: clean
clean:
	rm -rf $(OUTPUT_DIR)
