package tool;
import processing.core.PApplet;
import tool.Shape;


public class Ball extends Shape{
	/**
	 * 
	 */
	
	public Ball(PApplet p) {
		super(p);
	}
	
	public void drawShape() {
		checkSelection();
		parent.noStroke();
		parent.fill(color);
		parent.ellipse(x, y, sx, sy);
	}
	
	private void checkSelection() {
		if (isInside()) {
			changeColor(switchColor);
		}
		else {
			changeColor(255);
		}
	}
	
	private void changeColor(int c) {
		color = c;
	}
}
